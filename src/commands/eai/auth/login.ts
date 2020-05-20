import { flags, SfdxCommand } from '@salesforce/command';
import { ConfigFile, Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { readFileSync } from 'fs';
import { join } from 'path';
import EAIToken from '../../../utils/token';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:auth', 'login');

export default class Login extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:auth:login -n name@company.com -f einstein_platform.pem -e 1
  Successfully obtained auth token for name@company.com
  `
  ];

  protected static flagsConfig = {
    name: flags.string({char: 'n', required: true, description: messages.getMessage('nameFlagDescription')}),
    pemlocation: flags.string({char: 'f', required: true, description: messages.getMessage('pemFlagDescription')}),
    expiration: flags.number({char: 'e', default: 1, description: messages.getMessage('expirationFlagDescription') })
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;
  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const PRIV_KEY = readFileSync(this.flags.pemlocation, 'utf8');
    const eaitoken = new EAIToken();
    const authtoken = await eaitoken.getAccessTokenViaLogin(this.flags.name, this.flags.expiration, PRIV_KEY);
    const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });

    econfig.setContentsFromObject(authtoken);
    econfig.set('pemlocation', join(process.cwd(), this.flags.pemlocation));
    econfig.write();

    this.ux.log(messages.getMessage('commandSuccess', [ this.flags.name ]));
    return { username: this.flags.name, message: messages.getMessage('commandSuccess', [ this.flags.name ]) };
  }
}
