import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

import EAITransport from '../../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eaidc:language:datasets', 'retrain');

export default class RetrainLanguageDataSet extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static examples = [
  `$ sfdx eai:language:datasets:retrain --modelid 57
  Successfully requested to retrain the model with id: TDD3UH52XGFRUMC2D63R24H4KM
  datasetId:        1187599
  modelId:          HQSIQO6FMPTONEJ6R3T6LE2TAI
  name:             new model
  status:           QUEUED
  progress:         0
  createdAt:        2020-04-05T22:21:17.000+0000
  You can check the status of the training by entering the command below
  sfdx eai:language:datasets:train:status -i HQSIQO6FMPTONEJ6R3T6LE2TAI
`
  ];

  protected static flagsConfig = {
    modelid: flags.string({char: 'i', required: true, description: 'Id of the model to be retrained' }),
    epochs: flags.integer({char: 'e', required: false, description: 'Number of training iterations for the neural network. Optional. Valid values are 1–1,000.' }),
    learningrate: flags.number({char: 'r', required: false, description: 'Specifies how much the gradient affects the optimization of the model at each time step. Optional. Use this parameter to tune your model. Valid values are between 0.0001 and 0.01. If not specified, the default is 0.0001. We recommend keeping this value between 0.0001 and 0.001.    This parameter isn\'t used when training a detection dataset.' }),
    trainparams: flags.string({char: 'p', required: false, description: 'JSON that contains parameters that specify how the model is created. '})
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const formData = require('form-data');

    const path: string = 'https://api.einstein.ai/v2/language/retrain';

    const form = new formData();
    form.append('modelId', this.flags.modelid);
    if (this.flags.epoches) form.append('epochs', this.flags.epochs);
    if (this.flags.learningrate) form.append('learningRate', this.flags.learningrate);
    if (this.flags.trainparams) form.append('trainParams', this.flags.trainparams);

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(data => {
      const responseMessage = messages.getMessage('commandSuccess', [ data.modelId ]);
      const nextCommand = `sfdx eai:language:datasets:train:status -i ${data.modelId}`;
      this.ux.styledObject(data, [ 'datasetId', 'modelId', 'name', 'status', 'progress', 'createdAt']);
      this.ux.log(messages.getMessage('statusCommandPrompt', [ nextCommand ]));
      return { message: responseMessage, data, nextCommand };
    });

  }
}
