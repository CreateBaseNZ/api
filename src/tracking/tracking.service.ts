import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracking, TrackingDocument } from './tracking.schema';
import { DataService } from 'src/data/data.service';
import { LicenseService } from 'src/license/license.service';
import * as moment from 'moment-timezone';
import { GroupService } from 'src/group/group.service';
import { ClassService } from 'src/class/class.service';
import { License } from 'src/license/license.schema';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel('Tracking') private trackingModel: Model<TrackingDocument>,
    private readonly dataService: DataService,
    private readonly licenseService: LicenseService,
    private readonly groupService: GroupService,
    private readonly classService: ClassService,
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
    const data = await this.dataService.fetchAllMixpanelProdData();
    const trackingDataArray: Array<any> = [];
    for (let i = 0; i < data.length; i++) {
      const trackingData: any = {
        _id: new mongoose.Types.ObjectId(),
        profile: new mongoose.Types.ObjectId(data[i].properties.distinct_id),
        groups: undefined,
        group: undefined,
        licenses: undefined,
        license: undefined,
        classes: undefined,
        event: data[i].event,
        timestamp: moment('1970-01-01')
          .tz('Pacific/Auckland')
          .add(data[i].properties.time, 's')
          .toDate(),
        duration: data[i].properties.duration,
        project: data[i].properties.project,
        subsystem: data[i].properties.subsystem,
      };
      [
        trackingData.groups,
        trackingData.group,
        trackingData.licenses,
        trackingData.license,
        trackingData.classes,
      ] = this.setTrackingDetailGroupsLicensesClasses(
        licenses,
        trackingData.profile,
      );
      trackingDataArray[i] = trackingData;
    }
    for (let j = 0; j < trackingDataArray.length; j++) {
      const trackingData = trackingDataArray[j];
      await this.create(trackingData);
    }
    return;
  }

  setTrackingDetailGroupsLicensesClasses(
    licenses: Array<License>,
    profileId: mongoose.Schema.Types.ObjectId,
  ): any {
    const profileLicenses = licenses.filter((license) => {
      return license.profile.toString() === profileId.toString();
    });
    const trackingGroups: Array<any> = [];
    const trackingLicenses: Array<any> = [];
    let trackingClasses: Array<any> = [];
    for (let i = 0; i < profileLicenses.length; i++) {
      const license = profileLicenses[i];
      trackingGroups.push(license.group);
      trackingLicenses.push(license._id);
      trackingClasses = trackingClasses.concat(license.classes);
    }
    const trackingGroup: any = trackingGroups.length
      ? trackingGroups[0]
      : undefined;
    const trackingLicense: any = trackingLicenses.length
      ? trackingLicenses[0]
      : undefined;
    return [
      trackingGroups,
      trackingGroup,
      trackingLicenses,
      trackingLicense,
      trackingClasses,
    ];
  }
}
