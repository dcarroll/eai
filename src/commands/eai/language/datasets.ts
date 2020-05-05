import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eai:language', 'datasets');

export default class GetLanguageDataSets extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets
  Oauth token obtained!
  `
  ];

  protected static flagsConfig = {
    datasetid: flags.string({char: 'i', required: false, description: messages.getMessage('datasetIdFlagDescription') })
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = (this.flags.datasetid) ? `https://api.einstein.ai/v2/language/datasets/${this.flags.datasetid}` : 'https://api.einstein.ai/v2/language/datasets/';

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = messages.getMessage('commandSuccess');
      this.ux.log(responseMessage);
      if (this.flags.datasetid) {
      } else {
        this.formatResults(data);
      }
      return { message: responseMessage, data };
    });
  }

  private formatResults(data) {
    const opts: TableOptions = { columns: [
      { key: 'DatasetId', label: 'Id' },
      { key: 'Name', label: 'Name' },
      { key: 'Created', label: 'Created' },
      { key: 'Updated', label: 'Updated' },
      { key: 'Type', label: 'Type' },
      { key: 'Examples', label: 'Examples' },
      { key: 'Labels', label: 'Labels' },
      { key: 'Status', label: 'Status' }
    ]};
    const mappedData: Array<{
      DatasetId: string,
      Name: string,
      Created: string,
      Updated: string,
      Type: string,
      Examples: number,
      Labels: number,
      Status: string
    }> = [];
    data.data.forEach(row => {
      if (row.available === true) {
        mappedData.push({
          DatasetId: row.id,
          Name: row.name,
          Created: new Date(row.createdAt).toLocaleString(),
          Updated: new Date(row.updatedAt).toLocaleString(),
          Type: row.type,
          Examples: row.totalExamples,
          Labels: row.totalLabels,
          Status: row.statusMsg
        });
      }
    });
    this.ux.table(mappedData, opts);
  }
}
