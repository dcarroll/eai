import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

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
    datasetid: flags.string({char: 'i', required: true, description: 'Id of the dataset to be trained' }),
    epochs: flags.integer({char: 'e', required: false, description: 'Number of training iterations for the neural network. Optional. Valid values are 1–1,000.' }),
    learningrate: flags.number({char: 'r', required: false, description: 'Specifies how much the gradient affects the optimization of the model at each time step. Optional. Use this parameter to tune your model. Valid values are between 0.0001 and 0.01. If not specified, the default is 0.0001. We recommend keeping this value between 0.0001 and 0.001.    This parameter isn\'t used when training a detection dataset.' }),
    name: flags.string({char: 'n', required: true, description: 'Name of the model. Maximum length is 180 characters'}),
    trainparams: flags.string({char: 'p', required: false, description: 'JSON that contains parameters that specify how the model is created. '})
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
    if (this.flags.learningrate) form.append('learningRate', this.flags.learningrate);
    form.append('name', this.flags.name);
    if (this.flags.trainparams) form.append('trainParams', this.flags.trainparams);

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(data => {
      const responseMessage = 'Successfully retrieved prediction';
      this.ux.log(responseMessage);
      return { message: responseMessage, data };
    });

  }

}
