import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { License, LicenseDocument } from './license.schema';

@Injectable()
export class LicenseService {
  constructor(
    @InjectModel('License') private licenseModel: Model<LicenseDocument>,
  ) {}

  async findAll(): Promise<License[]> {
    return this.licenseModel.find().exec();
  }
}
