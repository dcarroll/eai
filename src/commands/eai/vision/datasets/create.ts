import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { createReadStream } from 'fs';
import EAITransport from './../../../../utils/transport';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:vision:datasets', 'create');

export default class CreateVisionDataSet extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:datasets:vision:create --name MyDataset --type image --path http://einstein.ai/images/mountainvsbeach.zip
  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    labels: flags.string({char: 'b', required: false, description: 'Comma-separated list of labels. Maximum number of labels per dataset is 250' }),
    name: flags.string({char: 'n', required: true, description: 'Name of the dataset. Maximum length is 180 characters.' }),
    language: flags.string({char: 'l', required: false, default: 'N/A', description: 'Dataset language. Optional. Default is N/A. Reserved for future use.' }),
    type: flags.string({char: 't', required: true, description: 'Type of dataset data. Valid values are image and image-multi-label. Available in Einstein Vision API version 2.0 and later.'}),
    path: flags.string({char: 'p', required: false, description: 'URL of the .zip file. The maximum .zip file size you can upload from a web location is 50 MB.'}),
    data: flags.string({char: 'd', required: false, description: 'local path to the .zip file. The maximum .zip file size you can upload is 50 MB.'})
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
    // const econfig = await ConfigFile.create({ isGlobal: true, filename: 'einstein.json' });

    // const authtoken = econfig.get('token');
    const path: string = 'https://api.einstein.ai/v2/vision/datasets/upload/sync';

    this.validateCommand();

    const form = new formData();
    if (this.flags.path) {
      form.append('path', this.flags.path);
    } else {
      form.append('data', createReadStream(this.flags.data));
    }
    form.append('type', this.flags.type);
    if (this.flags.labels) form.append('labels', this.flags.labels);
    form.append('name', this.flags.name);

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(data => {
      return data;
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
