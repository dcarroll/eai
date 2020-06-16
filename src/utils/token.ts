
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
    protected _token: AuthToken;
    protected expiration = null;

    public async getAccessTokenViaLogin(accountId: string, ttl: number, pemlocation: string): Promise<AuthToken> {
        if (!accountId || !pemlocation) {
            throw new Error('please provice accountId AND pem file location');
        }
        const privateKey = readFileSync(pemlocation, 'utf8');
        const halfLife = (Date.now() / 1000) + (ttl * 60) / 2;
        if (
            this.expiration !== null &&
            this.expiration > halfLife &&
            this._token !== null
        ) {
            return this._token;
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
            this._token = accessToken as AuthToken;
            this._token.user_name = accountId;
            this._token.pemlocation = privateKey;
            this.writeTokenInfo(this._token);
            return this._token;
        }).catch(err => {
            console.error(err);
        });
    }

    public async getAuthToken(): Promise<AuthToken> {
        return this.readTokenInfo();
    }

    public async getAccessTokenViaRefreshToken(): Promise<AuthToken> {
        await this.readTokenInfo();
        const transport = new EAITransport();
        const form = 'grant_type=refresh_token&refresh_token=' + this._token.refresh_token + '&valid_for=30000';
        const path = 'https://api.einstein.ai/v2/oauth2/token/';
        return transport.makeRefreshTokenRequest({ form, path, method: 'POST' })
        .then(tok => {
            return this.updateTokenConfig(tok as AuthToken);
        });
    }

    public async writeTokenInfo(token: AuthToken): Promise<AuthToken> {
        const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
        econfig.setContentsFromObject(token);
        return econfig.write()
        .then(configContents => {
            return this.configContentsToToken(configContents);
        });
    }

    public async readTokenInfo(): Promise<AuthToken> {
        return this.getConfigFile()
        .then(cfile => {
            return this.convertConfigToToken(cfile as ConfigFile<object>)
            .then(tok => {
                this._token = tok;
                return tok;
            });
        });
    }

    public async convertConfigToToken(config: ConfigFile<object>): Promise<AuthToken> {
        const contents = config.getContents();
        const authToken: AuthToken = { pemlocation: contents.pemlocation as string, access_token: contents.access_token as string, expires_in: contents.expires_in as string, refresh_token: contents.refresh_token as string, user_name: contents.user_name as string, token_type: contents.token_type as string };
        return authToken;
    }

    public async configContentsToToken(contents): Promise<AuthToken> {
        const authToken: AuthToken = { pemlocation: contents.pemlocation as string, access_token: contents.access_token as string, expires_in: contents.expires_in as string, refresh_token: contents.refresh_token as string, user_name: contents.user_name as string, token_type: contents.token_type as string };
        return authToken;
    }

    public async updateTokenConfig(data: AuthToken): Promise<AuthToken> {
        this._token.access_token = data.access_token;
        this._token.expires_in = data.expires_in;
        this._token.token_type = data.token_type;
        return this.writeTokenInfo(this._token)
       .then(tinfo => {
            return tinfo;
        });
    }

    private async getConfigFile(): Promise<ConfigFile<object>> {
        return ConfigFile.create({ isGlobal: true, filename: 'einstein.json' })
        .then(async econfig => {
            if (!await econfig.exists()) {
                throw new SfdxError('You need to run login before running other commands');
            } else {
                return econfig;
            }
        });
    }

}
