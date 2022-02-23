import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracking, TrackingDocument } from './tracking.schema';
import { DataService } from 'src/data/data.service';
import { LicenseService } from 'src/license/license.service';
import * as moment from 'moment-timezone';
import { GroupService } from 'src/group/group.service';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel('Tracking') private trackingModel: Model<TrackingDocument>,
    private readonly dataService: DataService,
    private readonly licenseService: LicenseService,
    private readonly groupService: GroupService,
  ) {}

  async create(createTracking: any): Promise<Tracking> {
    const createdTracking = new this.trackingModel(createTracking);
    return createdTracking.save();
  }

  async findAll(): Promise<Tracking[]> {
    return this.trackingModel.find().exec();
  }

  async buildTracking(): Promise<void> {
    const licenses = await this.licenseService.findAll();
    console.log(licenses);
    const groups = await this.groupService.findAll();
    console.log(groups);
    // const data = await this.dataService.fetchAllMixpanelProdData();
    // const trackingDataArray: Array<any> = [];
    // for (let i = 0; i < data.length; i++) {
    //   const trackingData: any = {
    //     profile: new mongoose.Types.ObjectId(data[i].properties.distinct_id),
    //     event: data[i].event,
    //     timestamp: moment('1970-01-01')
    //       .tz('Pacific/Auckland')
    //       .add(data[i].properties.time, 's')
    //       .toDate(),
    //     duration: data[i].properties.duration,
    //     project: data[i].properties.project,
    //     subsystem: data[i].properties.subsystem,
    //   };
    //   trackingDataArray[i] = trackingData;
    // }
    return;
  }

  // setTrackingDetailGroups(): any {}

  // setTrackingDetailLicenses(): any {}

  // setTrackingDetailClasses(): any {}
}
