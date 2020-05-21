
import { ConfigFile, SfdxError } from '@salesforce/core';
import { readFileSync } from 'fs';
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

    public async getAccessTokenViaLogin(accountId: string, ttl: number, pemlocation: string): Promise<AuthToken> {
        console.log('In getAccessTokenViaLogin');
        if (!accountId || !pemlocation) {
            throw new Error('please provice accountId AND pem file location');
        }
        const privateKey = readFileSync(pemlocation, 'utf8');
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
            this.token.pemlocation = privateKey;
            this.writeTokenInfo(this.token);
            return this.token;
        }).catch(err => {
            console.error(err);
        });
    }

    public async getAuthToken() {
        return this.readTokenInfo();
    }

    public async getAccessTokenViaRefreshToken() {
        console.log('In getAccessTokenViaRefreshToken');
        const transport = new EAITransport();
        const form = 'grant_type=refresh_token&refresh_token=' + this.token.refresh_token + '&valid_for=30000';
        const path = 'https://api.einstein.ai/v2/oauth2/token/';
        console.log('Returning data from getAccessTokenViaRefreshToken');
        return transport.makeRefreshTokenRequest({ form, path, method: 'POST' });

        /* return this.readTokenInfo()
        .then(tokeninfo => {
            const transport = new EAITransport();
            const form = 'grant_type=refresh_token&refresh_token=' + tokeninfo.refresh_token + '&valid_for=30000';
            const path = 'https://api.einstein.ai/v2/oauth2/token/';
            console.log('Returning data from getAccessTokenViaRefreshToken');
            return transport.makeRefreshTokenRequest({ form, path, method: 'POST' });
        });*/
    }

    public async writeTokenInfo(token: AuthToken) {
        console.log('In writeTokenInfo');
        const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
        econfig.setContentsFromObject(token);
        // econfig.set('pemlocation', join(process.cwd(), this.flags.pemlocation));
        console.log('Returning from writeTokenInfo');
        econfig.write();
        return token;
    }

    public async readTokenInfo(): Promise<AuthToken> {
        console.log('Reading token info from config');
        return this.getConfigFile()
        .then(cfile => {
            return this.convertConfigToToken(cfile as ConfigFile<object>)
            .then(tok => {
                this.token = tok;
                return tok;
            });
        });
    }

    public async convertConfigToToken(config: ConfigFile<object>): Promise<AuthToken> {
        console.log('In convertConfigToToken');
        const contents = config.getContents();
        const authToken: AuthToken = { pemlocation: contents.pemlocation as string, access_token: contents.access_token as string, expires_in: contents.expires_in as string, refresh_token: contents.refresh_token as string, user_name: contents.user_name as string, token_type: contents.token_type as string };
        console.log('Returning from convertConfifToToken');
        return authToken;
    }

    public async updateTokenConfig(data: AuthToken) {
        console.log('In updateTokenConfig');
        this.token.access_token = data.access_token;
        this.token.expires_in = data.expires_in;
        this.token.token_type = data.token_type;
        return this.token;

        /* return this.readTokenInfo()
        .then(tokeninfo => {
            tokeninfo.access_token = data.access_token;
            tokeninfo.expires_in = data.expires_in;
            tokeninfo.token_type = data.token_type;
            return this.writeTokenInfo(tokeninfo)
            .then(tinfo => {
                return tinfo;
            });
        });*/
    }

    private async getConfigFile(): Promise<ConfigFile<object>> {
        console.log('In getConfigFile');
        const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
        if (!econfig.exists) {
            throw new SfdxError('You need to run login before running other commands');
        }
        return econfig;
    }

}
