import { flags, SfdxCommand } from '@salesforce/command';
import { ConfigFile, Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import fetch = require('node-fetch');
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eai:vision', 'datasets');

export default class GetVisionDataSets extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    datasetid: flags.string({char: 'i', required: false, description: 'dataset id to retrieve, if not specified all datasets are retrieved' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });

    const authtoken = econfig.get('token');
    const path: string = (this.flags.datasetid) ? 'https://api.einstein.ai/v2/vision/datasets/' + this.flags.datasetid : 'https://api.einstein.ai/v2/vision/datasets/';

    return fetch(path, {
            headers: {
              Authorization: 'Bearer ' + authtoken
            },
            method: 'GET'
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      this.ux.log('Successfully retrieved dataset');
      return res.json().then(data => {
        console.log(JSON.stringify(data, null, 4));
        return data;
      });
    });

  }
}
