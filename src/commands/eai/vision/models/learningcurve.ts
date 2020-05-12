import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:vision:models', 'learningcurve');

export default class GetVisionModelLearningCurve extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    modelid: flags.string({char: 'i', required: true, description: 'model id to retrieve, if not specified all datasets are retrieved' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {

    const path: string = 'https://api.einstein.ai/v2/vision/models/' + this.flags.modelid + '/lc';

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = 'Successfully retrieved learning curve';
      this.ux.log(responseMessage);
      this.formatResults(data);
      return { message: responseMessage, data };
    });
  }

  private formatResults(data) {
    const opts: TableOptions = { columns: [
      { key: 'Epoch', label: 'Epoch' },
      { key: 'TrainingLoss', label: 'Training Loss'},
      { key: 'MeanAveragePrecision', label: 'MA Precision' },
      { key: 'F1', label: 'F1' },
      { key: 'Label', label: 'Label' },
      { key: 'Recall', label: 'Recall' },
      { key: 'Precision', label: 'Precision' },
      { key: 'AveragePrecision', label: 'AveragePrecision' }
    ]};
    const mappedData: Array<{
      Epoch: number,
      TrainingLoss: number,
      MeanAveragePrecision: number,
      F1: string,
      Label: string,
      Recall: string,
      Precision: string,
      AveragePrecision: number
    }> = [];
    data.data.forEach(row => {
      row.metricsData.labelMetrics.forEach(lrow => {
        mappedData.push({
          Epoch: row.epoch,
          TrainingLoss: row.metricsData.modelMetrics.trainingLoss,
          MeanAveragePrecision: row.metricsData.modelMetrics.meanAveragePrecision,
          F1: lrow.f1,
          Label: lrow.label,
          Recall: JSON.stringify(lrow.recall),
          Precision: JSON.stringify(lrow.precision),
          AveragePrecision: lrow.averagePrecision
        });
      });
    });
    this.ux.table(mappedData, opts);
  }

}
