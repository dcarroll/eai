import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from './../../../utils/transport';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eai:vision', 'datasets');

export default class GetVisionDataSets extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    datasetid: flags.string({char: 'i', required: false, description: 'dataset id to retrieve, if not specified all datasets are retrieved' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = (this.flags.datasetid) ? 'https://api.einstein.ai/v2/vision/datasets/' + this.flags.datasetid : 'https://api.einstein.ai/v2/vision/datasets/';

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
