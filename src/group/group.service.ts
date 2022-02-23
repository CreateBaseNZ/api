import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './group.schema';

@Injectable()
export class GroupService {
  constructor(@InjectModel('Group') private groupModel: Model<GroupDocument>) {}

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }
}
