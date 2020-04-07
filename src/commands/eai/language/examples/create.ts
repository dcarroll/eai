import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { createReadStream } from 'fs';
import EAITransport from '../../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eai:language:examples', 'create');

export default class CreateLanguageExample extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:examples:create --datasetid 1187600 --path =http://einstein.ai/text/weather_update.csv
  Oauth token obtained!
  `
  ];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    data: flags.string({char: 'd', exclusive: ['path'], required: false, description: 'local path to the .zip file. The maximum .zip file size you can upload from a web location is 50 MB.'}),
    path: flags.string({char: 'p', exclusive: ['data'], required: false, description: 'URL of the .zip file. The maximum .zip file size you can upload from a web location is 50 MB.'}),
    datasetid: flags.string({char: 'i', required: true, description: 'dataset id to add the examples to'})
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;
  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const formData = require('form-data');

    const path: string = `https://api.einstein.ai/v2/language/datasets/${this.flags.datasetid}/upload`;

    const form = new formData();
    if (this.flags.path) {
      form.append('path', this.flags.path);
    } else {
      form.append('data', createReadStream(this.flags.data));
    }

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'PUT' })
    .then(data => {
      const responseMessage = messages.getMessage('commandSuccess', [ data.id ]);
      this.ux.log(responseMessage);
      this.formatResults(data);
      return { message: responseMessage, data };
    });
  }

  private formatResults(data) {
    this.ux.styledObject(data, [ 'id', 'type', 'statusMsg' ]);
  }
}
