import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
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

  protected static requiresUsername = true;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;
  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const eaitoken = new EAIToken();
    return eaitoken.getAccessTokenViaLogin(this.flags.name, this.flags.expiration, this.flags.pemlocation)
    .then(authtoken => {
      this.ux.log(messages.getMessage('commandSuccess', [ this.flags.name ]));
      return { username: this.flags.name, message: messages.getMessage('commandSuccess', [ this.flags.name ]) };
    });
    /* const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });

    econfig.setContentsFromObject(authtoken);
    econfig.set('pemlocation', join(process.cwd(), this.flags.pemlocation));
    econfig.write();*/

  }
}
