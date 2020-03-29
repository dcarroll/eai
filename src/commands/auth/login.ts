import { flags, SfdxCommand } from '@salesforce/command';
import { ConfigFile, Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { readFileSync } from 'fs';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eai', 'auth');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:auth:login --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
    pemlocation: flags.string({char: 'f', description: messages.getMessage('forceFlagDescription')}),
    expiration: flags.string({char: 'e', description: 'number of minutes until token expires' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const name = this.flags.name;
    const outputString = 'test output';
    // The type we are querying for
    // interface Organization {
    //   Name: string;
    //   TrialExpirationDate: string;
    // }
    if (!this.flags.name) {
      throw new SfdxError(messages.getMessage('errorNoOrgResults'));
    }

    if (!this.flags.pemlocation) {
      throw new SfdxError(messages.getMessage('errorNoOrgResults'));
    }

    this.setConfig();

    this.sfEinstein.getToken().then(async token => {
      console.log(token);
      const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
      econfig.set('username', this.flags.name);
      econfig.set('token', token);
      econfig.write();
    });
    this.ux.log(outputString);

    // Return an object to be displayed with --json
    return { username: name, message: outputString };
  }

  private setConfig() {
    const PRIV_KEY = readFileSync(this.flags.pemlocation, 'utf8');
    console.log(PRIV_KEY);
    this.sfEinstein.setup({
        baseUrl :  'https://api.einstein.ai',
        accountId :  this.flags.name,
        privateKey :  PRIV_KEY
    });
  }

}
