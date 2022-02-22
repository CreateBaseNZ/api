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
    const data = await this.dataService.getData();
    const trackingDataArray: Array<any> = [];
    for (let i = 0; i < data.length; i++) {
      const trackingData: any = {
        profile: new mongoose.Types.ObjectId(data[i].properties.distinct_id),
        event: data[i].event,
        timestamp: moment('1970-01-01')
          .tz('Pacific/Auckland')
          .add(data[i].properties.time, 's')
          .toDate(),
        duration: data[i].properties.duration,
        project: data[i].properties.project,
        subsystem: data[i].properties.subsystem,
      };
      if (data[i].properties.licenses.length) {
        trackingData.license = data[i].properties.licenses[0];
        trackingData.licenses = data[i].properties.licenses;
      }
      if (data[i].properties.schools.length) {
        trackingData.group = data[i].properties.schools[0];
        trackingData.groups = data[i].properties.schools;
      }
      trackingDataArray[i] = trackingData;
    }
    return;
  }
}
