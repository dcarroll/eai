import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAIToken from '../../../utils/token';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.

export default class GetToken extends SfdxCommand {

  public static examples = [
  `$ sfdx eai:auth:gettoke
  Successfully obtained auth token
  `
  ];

  protected static flagsConfig = {
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;
  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const eaitoken = new EAIToken();
    const configToken = await eaitoken.getConfigToken();

    this.ux.log('Retrieved token for ' + configToken.user_name + '\n' + configToken.access_token);
    return { username: configToken.user_name, token: configToken.access_token };
  }
}
