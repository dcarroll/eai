import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { createReadStream } from 'fs';
import EAITransport from '../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:language:feedback', 'create');

export default class CreateLanguageFeedback extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:feeback:create --modelid 4353445 --document "Is it snowing in Denver" --expectedlabel "current-weather"
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    document: flags.string({char: 'd', required: true, description: 'Intent or sentiment string to add to the dataset.'}),
    expectedlabel: flags.string({char: 'l', required: true, description: 'Correct label for the example. Must be a label that exists in the dataset.'}),
    modelid: flags.string({char: 'i', required: true, description: 'model id to add the feedback to'})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const formData = require('form-data');

    const path: string = 'https://api.einstein.ai/v2/language/feedback';

    const form = new formData();
    form.append('document', this.flags.document);
    form.append('expectedLabel', this.flags.expectedlabel);
    form.append('modelId', createReadStream(this.flags.modelid));

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(data => {
      const responseMessage = 'Successfully created language feedback';
      this.ux.log(responseMessage);
      return { message: responseMessage, data };
    });

  }
}
