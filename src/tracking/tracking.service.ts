import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracking, TrackingDocument } from './tracking.schema';
import { DataService } from 'src/data/data.service';
import * as moment from 'moment-timezone';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel('Tracking') private trackingModel: Model<TrackingDocument>,
    private readonly dataService: DataService,
  ) {}

  async create(createTracking: any): Promise<Tracking> {
    const createdTracking = new this.trackingModel(createTracking);
    return createdTracking.save();
  }

  async findAll(): Promise<Tracking[]> {
    return this.trackingModel.find().exec();
  }

  async buildTracking(): Promise<void> {
    const data = (await this.dataService.findAll())[0];
    const rawData = data.content.split('\n');
    rawData.pop();
    for (let i = 0; i < rawData.length; i++) {
      const parsedData = JSON.parse(rawData[i]);
      if (parsedData.event === '$identify') continue;
      const createTracking: any = {
        profile: new mongoose.Types.ObjectId(parsedData.properties.distinct_id),
        event: parsedData.event,
        timestamp: moment('1970-01-01')
          .tz('Pacific/Auckland')
          .add(parsedData.properties.time, 's')
          .toDate(),
      };
      if (parsedData.properties.licenses.length) {
        createTracking.license = parsedData.properties.licenses[0];
        createTracking.licenses = parsedData.properties.licenses;
      }
      if (parsedData.properties.schools.length) {
        createTracking.group = parsedData.properties.schools[0];
        createTracking.groups = parsedData.properties.schools;
      }
      await this.create(createTracking);
    }
    return;
  }
}
