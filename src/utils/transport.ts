
import { SfdxError } from '@salesforce/core';
import Controller from 'abort-controller';
// import { readFileSync } from 'fs';
import fetch from 'cross-fetch';
import EAIToken from './token';

export default class EAITransport {

    protected expiration = null;
    protected accessToken = null;
    protected eaiToken: EAIToken = new EAIToken();
    protected retryCount = 0;

    public async makeRequest(requestData) {
        return this.doRequest(requestData);
    }

    public async doRequest(requestData) {
        return this.eaiToken.getAuthToken()
            .then(authtoken => {
                const controller = new Controller();
                return this.eaiToken.getAccessTokenViaRefreshToken()
                .then(() => {
                    return fetch(requestData.path, {
                        signal: controller.signal,
                        body: requestData.form,
                        headers: {
                            Authorization: 'Bearer ' + authtoken.access_token
                        },
                        method: requestData.method
                    }).then(async res => {
                        if (!res.ok) {
                            if (res.status === 504) {
                                throw new SfdxError(res.statusText);
                            } else {
                                return res.json().then(data => {
                                    throw new SfdxError(data.message);
                                });
                            }
                        } else {
                            return res.json().then(data => {
                                return data;
                            });
                        }
                    });
                });
            });
    }

    public async makeRefreshTokenRequest(requestData): Promise<object> {

        return fetch(requestData.path, {
            body: requestData.form,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            method: requestData.method
        }).then(async res => {
            if (!res.ok) {
                const body = JSON.parse(res.body.toString());
                if (body.errors) {
                    throw new SfdxError(body.errors[0]);
                } else {
                    throw new SfdxError(body.message);
                }
            } else {
                return res.json().then(data => {
                    return data;
                });
            }
        });
    }

}
