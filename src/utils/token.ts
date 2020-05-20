
import { ConfigFile, SfdxError } from '@salesforce/core';
import { readFileSync } from 'fs';
import jwt = require('jsonwebtoken');
import fetch = require('node-fetch');

interface AuthToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: string;
    user_name: string;
}
export default class EAIToken {

    protected expiration = null;
    protected accessToken = null;
    protected username = null;

    public async getAccessToken(accountId: string, ttl: number, privateKey: string): Promise<AuthToken> {
        if (!accountId || !privateKey) {
            throw new Error('please provice accountId AND privateKey');
        }
        const halfLife = (Date.now() / 1000) + (ttl * 60) / 2;
        if (
            this.expiration !== null &&
            this.expiration > halfLife &&
            this.accessToken !== null
        ) {
            return this.accessToken;
        }
        const payloadExpiration = (Date.now() / 1000) + (ttl * 60);
        const payload = {
            aud: 'https://api.einstein.ai/v2/oauth2/token',
            exp: payloadExpiration,
            sub: accountId
        };
        const token = jwt.sign(
            payload,
            privateKey.replace(/\\n/g, '\n'),
            { algorithm: 'RS256'}
        );
        return fetch('https://api.einstein.ai/v2/oauth2/token', {
            body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}&scope=offline`,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        }).then((response: { ok: boolean; statusText: string; json: () => object; }) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            // const { access_token } = response.json();
            return response.json();

        }).then(accessToken => {

            const tok =  accessToken as AuthToken;
            tok.user_name = accountId;
            return tok;

        }).catch(err => {
            console.error(err);
        });
    }

    public async getConfigToken() {
        const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
        if (!econfig.exists) {
            throw new SfdxError('You need to run login before running other commands');
        } else {
            const name = econfig.get('username');
            const expiry = econfig.get('expiry');
            const PRIV_KEY = readFileSync(econfig.get('pemlocation').toString(), 'utf8');
            const eaitoken = new EAIToken();
            return eaitoken.getAccessToken(name.toString(), expiry as number, PRIV_KEY);
        }
    }

}
