import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassModule } from 'src/class/class.module';
import { DataModule } from 'src/data/data.module';
import { GroupModule } from 'src/group/group.module';
import { LicenseModule } from 'src/license/license.module';
import { TrackingController } from './tracking.controller';
import { TrackingSchema } from './tracking.schema';
import { TrackingService } from './tracking.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Tracking', schema: TrackingSchema }],
      'default',
    ),
    DataModule,
    LicenseModule,
    GroupModule,
    ClassModule,
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
