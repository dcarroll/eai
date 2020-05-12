import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:language:models', 'delete');

export default class DeleteLanguageModel extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:models:delete --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    modelid: flags.string({char: 'i', required: true, description: 'modelset id to delete' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = `https://api.einstein.ai/v2/language/models/${this.flags.modelid}`;

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'DELETE' })
    .then(data => {
      const responseMessage = 'Successfully deleted language model';
      this.ux.log(responseMessage);
      return { message: responseMessage, data };
    });

  }
}
