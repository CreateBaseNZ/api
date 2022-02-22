import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataModule } from 'src/data/data.module';
import { TrackingController } from './tracking.controller';
import { TrackingSchema } from './tracking.schema';
import { TrackingService } from './tracking.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tracking', schema: TrackingSchema }]),
    DataModule,
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
