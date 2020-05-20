
import { ConfigFile, SfdxError } from '@salesforce/core';
// import { readFileSync } from 'fs';
import jwt = require('jsonwebtoken');
import fetch = require('node-fetch');
import EAITransport from './transport';

interface AuthToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: string;
    user_name: string;
    pemlocation: string;
}
export default class EAIToken {

    // protected accessToken = null;
    //  protected username = null;
    // protected refreshToken = null;
    public token: AuthToken;
    protected expiration = null;

    public async getAccessTokenViaLogin(accountId: string, ttl: number, privateKey: string): Promise<AuthToken> {
        if (!accountId || !privateKey) {
            throw new Error('please provice accountId AND privateKey');
        }
        const halfLife = (Date.now() / 1000) + (ttl * 60) / 2;
        if (
            this.expiration !== null &&
            this.expiration > halfLife &&
            this.token !== null
        ) {
            return this.token;
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

            this.token = accessToken as AuthToken;
            this.token.user_name = accountId;
            return this.token;

        }).catch(err => {
            console.error(err);
        });
    }

    public async getConfigToken(): Promise<AuthToken> {
        return this.getConfigFile()
        .then(cfile => {
            return this.convertConfigToToken(cfile as ConfigFile<object>);
        });
    }

    public async getAccessTokenViaRefreshToken() {
        console.log('In getAccessTokenViaRefreshToken');
        const token = this.getConfigToken();
        const transport = new EAITransport();
        const form = 'grant_type=refresh_token&refresh_token=' + (await token).refresh_token + '&valid_for=30000';
        const path = 'https://api.einstein.ai/v2/oauth2/token/';
        console.log('Returning data from getAccessTokenViaRefreshToken');
        return transport.makeRefreshTokenRequest({ form, path, method: 'POST' });
    }

    public async convertConfigToToken(config: ConfigFile<object>): Promise<AuthToken> {
        const contents = config.getContents();
        const authToken: AuthToken = { pemlocation: contents.pemlocation as string, access_token: contents.access_token as string, expires_in: contents.expires_in as string, refresh_token: contents.refresh_token as string, user_name: contents.user_name as string, token_type: contents.token_type as string };
        return authToken;
    }

    private async getConfigFile(): Promise<ConfigFile<object>> {
        const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
        if (!econfig.exists) {
            throw new SfdxError('You need to run login before running other commands');
        }
        return econfig;
    }

}
