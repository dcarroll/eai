
import { SfdxError } from '@salesforce/core';
// import { readFileSync } from 'fs';
import fetch = require('node-fetch');
import EAIToken from './token';

export default class EAITransport {

    protected expiration = null;
    protected accessToken = null;
    protected eaiToken: EAIToken = new EAIToken();

    public async makeRequest(requestData) {
        console.log('In makeRequest');
        return this.eaiToken.getConfigToken()
            .then(authtoken => {
                return fetch(requestData.path, {
                    body: requestData.form,
                    headers: {
                        Authorization: 'Bearer ' + authtoken.access_token
                    },
                    method: requestData.method
                }).then(async res => {
                    if (!res.ok) {
                        debugger;
                        if (res.status === 401) {
                            // This is the case where we can try to get a new access token via refresh token
                            await this.eaiToken.getAccessTokenViaRefreshToken();
                            this.makeRefreshTokenRequest(requestData);
                        } else {
                            throw new SfdxError(JSON.parse(res.body.read().toString()).message);
                        }
                    } else {
                        return res.json().then(data => {
                            console.log('Returning data from makeRequest');
                            return data;
                        });
                    }
                });
            });
    }

    public async makeRefreshTokenRequest(requestData) {
        console.log('In makeRereshTokenRequest');

        return fetch(requestData.path, {
            body: requestData.form,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            method: requestData.method
        }).then(async res => {
            if (!res.ok) {
                const body = JSON.parse(res.body.read().toString());
                if (body.errors) {
                    throw new SfdxError(body.errors[0]);
                } else {
                    throw new SfdxError(body.message);
                }
            } else {
                return res.json().then(data => {
                    console.log('Got access token...' + '\n' + JSON.stringify(data, null, 4));
                    return data;
                });
            }
        });
    }

    /*private async getConfigAccessToken() {
        console.log('In getConfig');
        const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
        if (!econfig.exists) {
            throw new SfdxError('You need to run login before running other commands');
        } else {
            // const name = econfig.get('username');
            // const expiry = econfig.get('expiry');
            // const PRIV_KEY = readFileSync(econfig.get('pemlocation').toString(), 'utf8');
            const eaitoken = new EAIToken();
            console.log('Returning data from getConfigToken');
            return  await eaitoken.getConfigToken();
        }
    }*/

    /*private async getConfigToken() {
        console.log('In getConfig');
        const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
        if (!econfig.exists) {
            throw new SfdxError('You need to run login before running other commands');
        } else {
            // const name = econfig.get('username');
            // const expiry = econfig.get('expiry');
            // const PRIV_KEY = readFileSync(econfig.get('pemlocation').toString(), 'utf8');
            const eaitoken = new EAIToken();
            console.log('Returning data from getConfigToken');
            return  await eaitoken.getAccessTokenViaRefreshToken();
        }
    }*/
}
