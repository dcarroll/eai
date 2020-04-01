import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { createReadStream } from 'fs';
import EAITransport from '../../../../utils/transport';
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eai:language:datasets', 'create');

export default class CreateLanguageDataSet extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:create --username myOrg@example.com --pemlocation secrets/einstein.pem
  Oauth token obtained!
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    data: flags.string({char: 'd', required: false, description: 'URL of the .zip file. The maximum .zip file size you can upload from a web location is 50 MB.'}),
    language: flags.string({char: 'l', required: false, default: 'N/A', description: 'Dataset language. Optional. Default is N/A. Reserved for future use.' }),
    name: flags.string({char: 'n', required: false, description: 'Name of the dataset. Maximum length is 180 characters.' }),
    path: flags.string({char: 'p', required: false, description: 'URL of the .zip file. The maximum .zip file size you can upload from a web location is 50 MB.'}),
    type: flags.string({char: 't', required: true, description: 'Type of dataset data. Valid values are image and image-multi-label. Available in Einstein Vision API version 2.0 and later.'})
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

    const path: string = 'https://api.einstein.ai/v2/language/datasets/upload/sync';

    this.validateCommand();

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
      const responseMessage = 'Successfully created language dataset';
      this.ux.log(responseMessage);
      return { message: responseMessage, data };
    });

  }

  private validateCommand() {
    if (this.flags.path && this.flags.data) {
      throw new SfdxError('You cannot specify both "path" and "data" in the same commend');
    }
    if (!this.flags.path && !this.flags.data && this.flags.type === 'image-detection') {
      throw new SfdxError('the dataset type image-detection is not allowed unless using "path" or "data"');
    }
  }
}
