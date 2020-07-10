import { ConfigFile } from '@salesforce/core';

export class EinsteinConfigFile extends ConfigFile<object> {
    public static getFileName(): string {
      return 'einstein.json';
    }

}
