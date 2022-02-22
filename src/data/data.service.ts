import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './data.schema';

@Injectable()
export class DataService {
  constructor(@InjectModel('Data') private dataModel: Model<DataDocument>) {}

  async findAll(): Promise<Data[]> {
    return this.dataModel.find().exec();
  }

  async getData(): Promise<any[]> {
    const rawData = (await this.findAll())[0];
    const rawDataArray = rawData.content.split('\n');
    rawDataArray.pop();
    const parsedDataArray: Array<any> = [];
    for (let i = 0; i < rawDataArray.length; i++) {
      const parsedData = JSON.parse(rawDataArray[i]);
      if (parsedData.event === '$identify') continue;
      parsedDataArray[i] = parsedData;
    }
    return parsedDataArray;
  }
}
