import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { write } from 'clipboardy';
import EAITransport from '../../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eaidc:language:datasets', 'delete');

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
    datasetid: flags.string({char: 'i', required: true, description: 'dataset id to retrieve, if not specified all datasets are retrieved' }),
    clipboard: flags.boolean({ char: 'c', description: 'places the dataset delete status command in your clipboard'})
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = (this.flags.datasetid) ? 'https://api.einstein.ai/v2/language/datasets/' + this.flags.datasetid : 'https://api.einstein.ai/v2/vision/datasets/';

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'DELETE' })
    .then(async  data => {
      const responseMessage = messages.getMessage('commandSuccess', [ this.flags.datasetid ]);
      this.ux.log(responseMessage);
      const nextCommand = `sfdx eai:language:datasets:delete:status -i ${data.id}`;
      if (this.flags.clipboard) {
        this.ux.log(messages.getMessage('statusCommandPromptClipboard', [ nextCommand ]));
        await write(nextCommand);
      } else {
        this.ux.log(messages.getMessage('statusCommandPrompt', [ nextCommand ]));
      }
      return { message: responseMessage, data, nextCommand };
    });

  }
}
