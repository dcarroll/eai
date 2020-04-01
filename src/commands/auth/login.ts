import { flags, SfdxCommand } from '@salesforce/command';
import { ConfigFile, Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { readFileSync } from 'fs';
import EAIToken from '../../utils/token';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eai:vision:auth', 'login');

export default class Login extends SfdxCommand {

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

    if (!this.flags.name) {
      throw new SfdxError(messages.getMessage('errorNoOrgResults'));
    }

    if (!this.flags.pemlocation) {
      throw new SfdxError(messages.getMessage('errorNoOrgResults'));
    }

    this.setConfig();
    const PRIV_KEY = readFileSync(this.flags.pemlocation, 'utf8');

    const eaitoken = new EAIToken();
    const authtoken = await eaitoken.getAccessToken(name, this.flags.expiration, PRIV_KEY);

    const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });
    econfig.set('username', this.flags.name);
    econfig.set('token', authtoken.access_token);
    econfig.set('expiry', authtoken.expires_in);
    econfig.write();
    this.ux.log('Successfully obtained auth token');

    // Return an object to be displayed with --json
    return { username: name, message: 'Successfully obtained auth token' };
  }

  private setConfig() {
  }

}
