import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { DataDocument } from './data.schema';

@Injectable()
export class DataService {
  private dataProdModel: Model<DataDocument>;
  private dataDevModel: Model<DataDocument>;
  constructor(
    @InjectConnection('prod') private readonly connectionProd: Connection,
    @InjectConnection('dev') private readonly connectionDev: Connection,
  ) {
    this.dataProdModel = this.connectionProd.model('Data');
    this.dataDevModel = this.connectionDev.model('Data');
  }

  async fetchAllMixpanelProdData(): Promise<any[]> {
    const rawDataProd = (await this.dataProdModel.find())[0].content;
    const rawDataProdArray = rawDataProd.split('\n');
    rawDataProdArray.pop();
    const rawDataDev = (await this.dataDevModel.find())[0].content;
    const rawDataDevArray = rawDataDev.split('\n');
    rawDataDevArray.pop();
    const mergedParsedRawDataArray: Array<any> = [];
    for (let i = 0; i < rawDataProdArray.length; i++) {
      const parsedRawData = JSON.parse(rawDataProdArray[i]);
      if (
        !parsedRawData.properties['$current_url'].includes(
          'app.createbase.co.nz',
        )
      ) {
        continue;
      }
      if (parsedRawData.event === '$identify') continue;
      mergedParsedRawDataArray.push(parsedRawData);
    }
    for (let i = 0; i < rawDataDevArray.length; i++) {
      const parsedRawData = JSON.parse(rawDataDevArray[i]);
      if (
        !parsedRawData.properties['$current_url'].includes(
          'app.createbase.co.nz',
        )
      ) {
        continue;
      }
      if (parsedRawData.event !== '$identify') continue;
      mergedParsedRawDataArray.push(parsedRawData);
    }
    return mergedParsedRawDataArray;
  }
}
