import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './class.schema';

@Injectable()
export class ClassService {
  constructor(@InjectModel('Class') private classModel: Model<ClassDocument>) {}

  async findAll(): Promise<Class[]> {
    return this.classModel.find().exec();
  }
}
