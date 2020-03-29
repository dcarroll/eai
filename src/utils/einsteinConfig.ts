import { ConfigFile } from '@salesforce/core';

export class EinsteinConfig extends ConfigFile<object> {
    public static getFileName(): string {
      return 'einstein.json';
    }
}
