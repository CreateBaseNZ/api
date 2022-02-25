import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracking, TrackingDocument } from './tracking.schema';
import { DataService } from 'src/data/data.service';
import { LicenseService } from 'src/license/license.service';
import * as moment from 'moment-timezone';
import { License } from 'src/license/license.schema';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel('Tracking') private trackingModel: Model<TrackingDocument>,
    private readonly dataService: DataService,
    private readonly licenseService: LicenseService,
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
        timestamp: Number(data[i].properties['$mp_api_timestamp_ms']) * 1000,
        duration: data[i].properties.duration,
        project: data[i].properties.project,
        subsystem: data[i].properties.subsystem,
        start: data[i].properties['start']
          ? data[i].properties['start']
          : undefined,
        end: data[i].properties['end'] ? data[i].properties['end'] : undefined,
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
