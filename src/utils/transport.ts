
import { ConfigFile, SfdxError } from '@salesforce/core';
import { readFileSync } from 'fs';
import fetch = require('node-fetch');
import EAIToken from './token';

export default class EAITransport {

    protected expiration = null;
    protected accessToken = null;

    public async makeRequest(requestData) {
        return this.getConfigToken()
            .then(authtoken => {
                return fetch(requestData.path, {
                    body: requestData.form,
                    headers: {
                        Authorization: 'Bearer ' + authtoken.access_token
                    },
                    method: requestData.method
                }).then(async res => {
                    if (!res.ok) {
                        throw new SfdxError(JSON.parse(res.body.read().toString()).message);
                    } else {
                        return res.json().then(data => {
                            return data;
                        });
                    }
                });
            });
    }

    private async getConfigToken() {
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
