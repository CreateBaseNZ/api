import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassController } from './class.controller';
import { ClassSchema } from './class.schema';
import { ClassService } from './class.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Class', schema: ClassSchema }],
      'default',
    ),
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
