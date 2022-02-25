import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracking, TrackingDocument } from './tracking.schema';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel('Tracking') private trackingModel: Model<TrackingDocument>,
  ) {}

  async create(createTracking: any): Promise<Tracking> {
    const createdTracking = new this.trackingModel(createTracking);
    return createdTracking.save();
  }

  async findAll(): Promise<Tracking[]> {
    return this.trackingModel.find().exec();
  }

  async find(query: any): Promise<Tracking[]> {
    return this.trackingModel.find(query);
  }

  setIds(tracking: any): any {
    tracking._id = new mongoose.Types.ObjectId();
    tracking.profile = new mongoose.Types.ObjectId(tracking.profile.toString());
    if (tracking.group) {
      tracking.group = new mongoose.Types.ObjectId(tracking.group.toString());
    }
    if (tracking.license) {
      tracking.license = new mongoose.Types.ObjectId(
        tracking.license.toString(),
      );
    }
    if (tracking.groups) {
      for (let i = 0; i < tracking.groups.length; i++) {
        tracking.groups[i] = new mongoose.Types.ObjectId(
          tracking.groups[i].toString(),
        );
      }
    }
    if (tracking.licenses) {
      for (let j = 0; j < tracking.licenses.length; j++) {
        tracking.licenses[j] = new mongoose.Types.ObjectId(
          tracking.licenses[j].toString(),
        );
      }
    }
    if (tracking.classes) {
      for (let k = 0; k < tracking.classes.length; k++) {
        tracking.classes[k] = new mongoose.Types.ObjectId(
          tracking.classes[k].toString(),
        );
      }
    }
    return tracking;
  }
}
