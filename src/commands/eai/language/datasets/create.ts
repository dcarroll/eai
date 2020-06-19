import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { createReadStream } from 'fs';
import EAITransport from '../../../../utils/transport';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('eaidc:language:datasets', 'create');

export default class CreateLanguageDataSet extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:language:datasets:create --type text-intent --data /mylocaldatapath.csv
  `
  ];

  protected static flagsConfig = {
    data: flags.string({char: 'd', exclusive: ['path'], required: false, description: 'URL of the .zip file in the local drive. The maximum .zip file size you can upload from a web location is 50 MB.'}),
    language: flags.string({char: 'l', required: false, default: 'N/A', description: 'Dataset language. Optional. Default is N/A. Reserved for future use.' }),
    name: flags.string({char: 'n', required: false, description: 'Name of the dataset. Maximum length is 180 characters.' }),
    path: flags.string({char: 'p', exclusive: ['data'], required: false, description: 'URL of the .zip file on the web. The maximum .zip file size you can upload from a web location is 50 MB.'}),
    type: flags.string({char: 't', required: true, description: 'Type of dataset data. Valid values are text-intent and text-sentiment. Available in Einstein Vision API version 2.0 and later.'})
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const formData = require('form-data');

    const path: string = 'https://api.einstein.ai/v2/language/datasets/upload/sync';

    const form = new formData();
    if (this.flags.path) {
      form.append('path', this.flags.path);
    } else {
      form.append('data', createReadStream(this.flags.data));
    }
    form.append('type', this.flags.type);
    if (this.flags.name) form.append('name', this.flags.name);

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(data => {
      const responseMessage = messages.getMessage('commandSuccess', [ data.id ]);
      this.ux.log(responseMessage);
      this.ux.styledObject(data, [ 'id', 'name', 'totalExamples', 'totalLabels', 'type']);
      return { message: responseMessage, data };
    });

  }
}
