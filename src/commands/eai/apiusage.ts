import { SfdxCommand, TableOptions } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import EAITransport from '../../utils/transport';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('eaidc', 'apiusage');

export default class ApiUsage extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx eai:apiusage

API Usage Summary
Period Start  Period End  Remaining  Used  Maximum
────────────  ──────────  ─────────  ────  ───────
March/2020    April/2020  1990       10    2000
  `
  ];

  protected static flagsConfig = { };
  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;
  protected monthLookup = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  protected sfEinstein = require('sf-einstein');

  public async run(): Promise<AnyJson> {
    const path: string = 'https://api.einstein.ai/v2/apiusage';
    const transport = new EAITransport();

    return transport.makeRequest({ form: null, path, method: 'GET' })
    .then(data => {
      const responseMessage = '\n' + messages.getMessage('commandSuccess');
      this.ux.log(responseMessage);
      this.formatResults(data);
      return { message: responseMessage, data };
    });
  }

  private formatResults(data) {
    const opts: TableOptions = { columns: [
      { key: 'OrganizationId', label: 'E.ai Org Id'},
      { key: 'Id', label: 'Id' },
      { key: 'StartMonthYear', label: 'Period Start' },
      { key: 'EndMonthYear', label: 'Period End' },
      { key: 'PredictionsRemaining', label: 'Remaining' },
      { key: 'PredictionsUsed', label: 'Used' },
      { key: 'PredictionsMax', label: 'Maximum' }
    ]};
    const mappedData: Array<{ OrganizationId: number, Id: number, StartMonthYear: string, EndMonthYear: string, PredictionsRemaining: number, PredictionsUsed: number, PredictionsMax: number }> = [];
    data.data.forEach(row => {
      mappedData.push({ OrganizationId: row.organizationId, Id: row.id, StartMonthYear: this.shortMonthYear(new Date(row.startsAt)), EndMonthYear: this.shortMonthYear(new Date(row.endsAt)), PredictionsRemaining: row.predictionsRemaining, PredictionsUsed: row.predictionsUsed, PredictionsMax: row.predictionsMax });
    });
    this.ux.table(mappedData, opts);
  }

  private shortMonthYear(thedate: Date) {
    return this.monthLookup[thedate.getMonth()] + '/' + thedate.getUTCFullYear();
  }
}
