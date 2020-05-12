import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:language:datasets:train', 'status');

export default class VisionTrainingStatus extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:dataset:train:status --modelid TDD3UH52XGFRUMC2D63R24H4KM
  Successfully retrieved training status
  name:             Simple Model
  status:           RUNNING
  modelId:          TDD3UH52XGFRUMC2D63R24H4KM
  modelType:        text-intent
  updatedAt:        2020-04-05T21:20:10.000+0000

  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    modelid: flags.string({char: 'i', required: true, description: 'language model id to retrieve training status for' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = 'https://api.einstein.ai/v2/language/train/' + this.flags.modelid;

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = 'Successfully retrieved training status';
      this.ux.log(responseMessage);
      this.formatResults(data);
      return { message: responseMessage, data };
    });
  }

  private formatResults(data) {
    this.ux.styledObject(data, [ 'name', 'status', 'modelId', 'modelType', 'updatedAt']);
  }

}
