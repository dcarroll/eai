import { flags, SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { createReadStream } from 'fs';
import EAITransport from '../../../utils/transport';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc:vision', 'predict');

export default class VisionOCR extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:vision:ocr --modelid 'OCRModel' --samplelocation https://www.publicdomainpictures.net/pictures/240000/velka/emergency-evacuation-route-signpost.jpg

Probability  Label       BB MinX  BB MinY  BB MaxX  BB MaxY
───────────  ──────────  ───────  ───────  ───────  ───────
0.99937266   ROUTE       582      685      1151     815
0.99471515   EMERGENCY   361      208      1383     346
0.99469215   EVACUATION  331      438      1401     570

  `
  ];

  // public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    modelid: flags.string({char: 'i', required: false, default: 'OCRModel', description: 'model id to make prediction against' }),
    samplepath: flags.string({char: 'p', exclusive: ['samplebase64content', 'samplelocation'], required: false, description: 'Path to the image file' }),
    samplelocation: flags.string({char: 'l', exclusive: ['samplebase64content', 'samplecontent'], required: false, description: 'URL of the image file' })
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

    const path: string = 'https://api.einstein.ai/v2/vision/ocr/';

    const form = new formData();
    form.append('modelId', this.flags.modelid);
    if (this.flags.samplebase64content) form.append('sampleBase64Content', this.flags.samplebase64content);
    // if (this.flags.samplecontent) form.append('sampleContent', createReadStream(this.flags.samplecontent));
    if (this.flags.samplepath) form.append('sampleContent', createReadStream(this.flags.samplecontent));
    if (this.flags.samplelocation) form.append('sampleLocation', this.flags.samplelocation);

    const transport = new EAITransport();

    return transport.makeRequest({ form, path, method: 'POST' })
    .then(data => {
      const responseMessage = 'Successfully identified words';
      this.formatResults(data);
      return { message: responseMessage, data };
    });

  }

  private formatResults(data) {
    const opts: TableOptions = { columns: [
      { key: 'Probability', label: 'Probability' },
      { key: 'Label', label: 'Label'},
      { key: 'BoundingBox.minx', label: 'BB MinX' },
      { key: 'BoundingBox.miny', label: 'BB MinY' },
      { key: 'BoundingBox.maxx', label: 'BB MaxX' },
      { key: 'BoundingBox.maxy', label: 'BB MaxY' }
    ]};
    const mappedData: Array<{
      Probability: number,
      Label: string,
      BoundingBox: {
        minx: number,
        miny: number,
        maxx: number,
        maxy: number
      }
    }> = [];
    data.probabilities.forEach(row => {
      mappedData.push({
          Probability: row.probability,
          Label: row.label,
          BoundingBox: {
            minx: row.boundingBox.minX,
            miny: row.boundingBox.minY,
            maxx: row.boundingBox.maxX,
            maxy: row.boundingBox.maxY
          }
        });
    });
    this.ux.table(mappedData, opts);
  }

}
