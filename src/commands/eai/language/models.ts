import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:language', 'models');

export default class GetLanguageModels extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    datasetid: flags.string({char: 'i', required: true, description: 'language dataset id to retrieve models for' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = `https://api.einstein.ai/v2/language/datasets/${this.flags.datasetid}/models`;

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = 'Successfully retrieved model(s)';
      this.formatResults(data);

      return { message: responseMessage, data };
    });

  }

  private formatResults(data) {
    const opts: TableOptions = { columns: [
      { key: 'ModelId', label: 'Model Id' },
      { key: 'DatasetId', label: 'Dataset Id'},
      { key: 'Name', label: 'Name' },
      { key: 'Created', label: 'Created' },
      { key: 'Updated', label: 'Updated' },
      { key: 'Type', label: 'Type' },
      { key: 'Algorithm', label: 'Algorithm' },
      { key: 'Status', label: 'Status' }
    ]};
    const mappedData: Array<{
      ModelId: string,
      DatasetId: string,
      Name: string,
      Created: string,
      Updated: string,
      Type: string,
      Algorithm: string,
      Status: string
    }> = [];
    data.data.forEach(row => {
      mappedData.push({
          ModelId: row.modelId,
          DatasetId: row.datasetId,
          Name: row.name,
          Created: new Date(row.createdAt).toLocaleString(),
          Updated: new Date(row.updatedAt).toLocaleString(),
          Type: row.modelType,
          Algorithm: row.algorithm,
          Status: row.status
        });
    });
    this.ux.table(mappedData, opts);
  }
}
