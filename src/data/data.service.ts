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
}
