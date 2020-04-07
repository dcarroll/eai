import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eai:language:datasets', 'delete');

export default class DeleteLanguageDataSet extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:datasets:delete --datasetid 12345
  successfully queued dataset 12345 for deletion
  You can check the status of the delete requestio by entering the command below
  sfdx eai.language:datasets:delete:status --datsetid 123345
  `
  ];

  protected static flagsConfig = {
    datasetid: flags.string({char: 'i', required: true, description: 'dataset id to retrieve, if not specified all datasets are retrieved' })
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = (this.flags.datasetid) ? 'https://api.einstein.ai/v2/language/datasets/' + this.flags.datasetid : 'https://api.einstein.ai/v2/vision/datasets/';

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'DELETE' })
    .then(data => {
      const responseMessage = messages.getMessage('commandSuccess', [ this.flags.datasetid ]);
      this.ux.log(responseMessage);
      const nextCommand = `sfdx eai:language:datasets:delete:status -i ${data.id}`;
      const statusCommandPrompt = messages.getMessage('statusCommandPrompt', [ nextCommand ]);
      this.ux.log(statusCommandPrompt);
      return { message: responseMessage, data, nextCommand };
    });

  }
}
