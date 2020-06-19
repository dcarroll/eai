import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { write } from 'clipboardy';
import EAITransport from '../../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eaidc:language:datasets', 'train');

export default class TrainLanguageDataSet extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:datasets:train --datasetid 57
  Successfully requested dataset '1187599' be trained, status is 'QUEUED'
  You can check the status of the training by entering the command below
    sfdx eai:language:datasets:train:status -i HQSIQO6FMPTONEJ6R3T6LE2TAI
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    datasetid: flags.string({char: 'i', required: true, description: messages.getMessage('datasetIdFlagDescription')}),
    epochs: flags.integer({char: 'e', required: false, description: messages.getMessage('epochsFlagDescription')}),
    learningrate: flags.number({char: 'r', required: false, description: messages.getMessage('learningRateFlagDescription')}),
    name: flags.string({char: 'n', required: true, description: messages.getMessage('nameFlagDescription')}),
    trainparams: flags.string({char: 'p', required: false, description: messages.getMessage('trainParamsFlagDescription')}),
    clipboard: flags.boolean({ char: 'c', description: 'places the dataset train status command in your clipboard' })
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const formData = require('form-data');

    const path: string = 'https://api.einstein.ai/v2/language/train';

    const form = new formData();
    form.append('datasetId', this.flags.datasetid);
    form.append('name', this.flags.name);
    if (this.flags.epoches) form.append('epochs', this.flags.epochs);
    if (this.flags.learningrate) form.append('learningRate', this.flags.learningrate);
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
        this.ux.styledObject(data, [ 'datasetId', 'name', 'status', 'modelType', 'modelId']);
      }
      return { message: responseMessage, data, nextCommand };
    });

  }

}
