import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:language', 'intent');

export default class LanguagePredict extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:intent --modelid  I3JZ7A5UJRRKU7EZGXZQLKEUZI --document "what is the weather in los angeles"
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    modelid: flags.string({char: 'i', required: true, description: 'model id to make prediction against' }),
    numresults: flags.integer({char: 'n', default: 2, required: false, description: 'Number of probabilities to return. Optional. If passed, must be a number greater than zero.' }),
    document: flags.string({char: 'd', required: true, description: 'the text to evaluate' }),
    sampleid: flags.string({char: 's', required: false, description: 'String that you can pass in to tag the prediction. Optional. Can be any value, and is returned in the response' })
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

    const path: string = 'https://api.einstein.ai/v2/language/intent/';

    const form = new formData();
    form.append('modelId', this.flags.modelid);
    form.append('numResults', this.flags.numresults);
    if (this.flags.sampleid) form.append(this.flags.sampleid);
    form.append('document', this.flags.document);

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(data => {
      const responseMessage = 'Successfully retrieved predictions';
      this.ux.log(responseMessage);
      this.formatResults(data);
      return { message: responseMessage, data };
    });
  }

  private formatResults(data) {
    const opts: TableOptions = { columns: [
      { key: 'Probability', label: 'Probability' },
      { key: 'Label', label: 'Label'}
    ]};
    const mappedData: Array<{
      Probability: number,
      Label: string
    }> = [];
    data.probabilities.forEach(row => {
      mappedData.push({
          Probability: row.probability,
          Label: row.label
        });
    });
    this.ux.table(mappedData, opts);
  }

}
