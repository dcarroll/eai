
import jwt = require('jsonwebtoken');
import fetch = require('node-fetch');

interface AuthToken {
    access_token: string;
    token_type: string;
    expires_in: string;
}
export default class EAIToken {

    protected expiration = null;
    protected accessToken = null;

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
            body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}&scope:offline`,
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

            return accessToken as AuthToken;

        }).catch(err => {
            console.error(err);
        });
    }
}
