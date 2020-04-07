import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eai:language', 'examples');

export default class GetLanguageExamples extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    datasetid: flags.string({char: 'i', exclusive: ['labelid'], required: true, description: 'language dataset id to retrieve examples for, if not specified all examples are retrieved' }),
    labelid: flags.string({char: 'l', exclusive: ['datasetid'], required: true, description: 'label id to retrieve examples for, if not specified all examples are retrieved' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = (this.flags.datasetid) ? `https://api.einstein.ai/v2/language/datasets/${this.flags.datasetid}/examples/` : `https://api.einstein.ai/v2/language/examples/${this.flags.labelid}`;

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = 'Successfully retrieved language examples';
      this.ux.log(responseMessage);
      return { message: responseMessage, data };
    });

  }
}
