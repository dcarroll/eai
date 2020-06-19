import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { write } from 'clipboardy';
import EAITransport from '../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:vision:datasets', 'train');

export default class TrainVisionDataSet extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:vision:datasets:train --datasetid 57
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    algorithm: flags.string({ char: 'a', required: false, default: 'object-detection-v1', description: 'Specifies the algorithm used to train the dataset. Optional. Use this parameter only when training a dataset with a type of image-detection. Valid values are \'object-detection-v1\' (default) and \'retail-execution\'' }),
    datasetid: flags.string({char: 'i', required: true, description: messages.getMessage('datasetIdFlagDescription') }),
    epochs: flags.integer({char: 'e', required: false, description: messages.getMessage('epochsFlagDescription') }),
    learningrate: flags.number({char: 'r', required: false, description: messages.getMessage('learningRateFlagDescription') }),
    name: flags.string({char: 'n', required: true, description: messages.getMessage('nameFlagDescription') }),
    trainparams: flags.string({char: 'p', required: false, description: messages.getMessage('trainParamsFlagDescription') }),
    clipboard: flags.boolean({ char: 'c', description: 'places the dataset:train:status command in your clipboard' })
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

    const path: string = 'https://api.einstein.ai/v2/vision/train';

    const form = new formData();
    form.append('datasetId', this.flags.datasetid);
    if (this.flags.epoches) form.append('epochs', this.flags.epochs);
    if (this.flags.algorithm) form.append('algorithm', this.flags.algorithm);
    if (this.flags.learningrate) form.append('learningRate', this.flags.learningrate);
    form.append('name', this.flags.name);
    if (this.flags.trainparams) form.append('trainParams', this.flags.trainparams);

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(async data => {
      const responseMessage = messages.getMessage('commandSuccess', [ data.datasetId, data.status ]);
      this.ux.log(responseMessage);
      const nextCommand = `sfdx eai:language:datasets:train:status -i ${data.modelId}`;
      if (this.flags.clipboard) {
        this.ux.log(messages.getMessage('statusCommandPromptClipboard', [ nextCommand ]));
        await write(nextCommand);
      } else {
        this.ux.log(messages.getMessage('statusCommandPrompt', [ nextCommand ]));
      }
      this.formatResults(data);
      return { message: responseMessage, data };

      return { message: responseMessage, data, nextCommand };
    });
  }

  private formatResults(data) {
    this.ux.styledObject(data, [ 'name', 'status', 'modelId', 'modelType', 'updatedAt']);
  }

}
