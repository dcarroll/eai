import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eai:language:datasets:delete', 'status');

export default class DeleteLanguageDataSetStatus extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');
  public static examples = [
  `$ sfdx eai:language:datasets:delete:status --deleterequestid
  Successfully retrieved language dataset delete status
  id:              XSBIYHY6LOJOBQVNNVRAODOYOU
  type:            DATASET
  status:          QUEUED
  deletedObjectId: 1186961
  `
  ];

  protected static flagsConfig = {
    deletrequestid: flags.string({char: 'i', required: true, description: 'dataset id to retrieve deletion status for' })
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = (this.flags.deletrequestid) ? 'https://api.einstein.ai/v2/language/deletion/' + this.flags.deletrequestid : 'https://api.einstein.ai/v2/vision/datasets/';
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
