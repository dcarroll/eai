import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:vision:models', 'metrics');

export default class GetVisionModelMetrics extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    modelid: flags.string({char: 'i', required: false, description: 'model id to retrieve, if not specified all datasets are retrieved' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = 'https://api.einstein.ai/v2/vision/models/' + this.flags.modelid;

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = 'Successfully retrieved vision model metrics';
      // this.ux.log(responseMessage);
      this.formatResultsModel(data);
      this.ux.log('');
      this.formatResultsLabels(data);
      return { message: responseMessage, data };
    });
  }

  private formatResultsModel(data) {
    const opts: TableOptions = { columns: [
      { key: 'ModelId', label: 'Model Id' },
      { key: 'Language', label: 'Language'},
      { key: 'Algorithm', label: 'Algorithm' },
      { key: 'Created', label: 'Created' },
      { key: 'TrainingLoss', label: 'Train Loss' },
      { key: 'AveragePrecision', label: 'MA Precision' }
    ]};
    const mappedData: Array<{
      ModelId: string,
      Language: string,
      Algorithm: string,
      Created: string,
      TrainingLoss: number,
      AveragePrecision: number
    }> = [];
    // data.metricsData.labelMetrics.forEach(row => {
    mappedData.push({
          ModelId: data.id,
          Language: data.language,
          Algorithm: data.algorithm,
          Created: new Date(data.createdAt).toLocaleString(),
          TrainingLoss: data.metricsData.modelMetrics.trainingLoss,
          AveragePrecision: data.metricsData.modelMetrics.meanAveragePrecision
        });
    // });
    this.ux.table(mappedData, opts);
  }

  private formatResultsLabels(data) {
    const opts: TableOptions = { columns: [
      { key: 'Label', label: 'Label' },
      { key: 'F1', label: 'F1' },
      { key: 'AveragePrecision', label: 'Avg Prec' },
      { key: 'Precision', label: 'Precision' },
      { key: 'Recall', label: 'Recall' }
    ]};
    const mappedData: Array<{
      Label: string,
      F1: number,
      AveragePrecision: number,
      Precision: string,
      Recall: string
    }> = [];
    data.metricsData.labelMetrics.forEach(row => {
      mappedData.push({
          Label: row.label,
          F1: row.f1,
          AveragePrecision: row.averagePrecision,
          Precision: JSON.stringify(row.precision),
          Recall: JSON.stringify(row.recall)
        });
    });
    this.ux.table(mappedData, opts);
  }

}
