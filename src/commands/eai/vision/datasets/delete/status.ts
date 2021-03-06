import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:vision:datasets:delete', 'status');

export default class DeleteVisionDataSetStatus extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:vision:datasets:delete:status --deleterequestid RUAV4YTHOASZZH3VHJB3IROX3E
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    deleterequestid: flags.string({char: 'i', required: true, description: 'dataset id to retrieve deletion status for' })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = 'https://api.einstein.ai/v2/vision/deletion/' + this.flags.deleterequestid;

    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = messages.getMessage('commandSuccess');
      this.ux.log(responseMessage);
      this.formatResults(data);
      return { message: responseMessage, data };
    });
  }

  private formatResults(data) {
    this.ux.styledObject(data, [ 'id', 'type', 'status', 'deletedObjectId' ]);
  }
}
