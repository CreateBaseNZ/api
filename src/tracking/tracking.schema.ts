import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TrackingDocument = Tracking & mongoose.Document;

@Schema()
export class Tracking {
  @Prop({ required: true })
  profile: mongoose.Schema.Types.ObjectId;

  @Prop()
  group: mongoose.Schema.Types.ObjectId;

  @Prop()
  groups: mongoose.Schema.Types.ObjectId[];

  @Prop()
  license: mongoose.Schema.Types.ObjectId;

  @Prop()
  licenses: mongoose.Schema.Types.ObjectId[];

  @Prop()
  classes: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true })
  event: string;

  @Prop({ required: true })
  timestamp: string;

  @Prop()
  duration: number;

  @Prop()
  project: string;

  @Prop()
  subsystem: string;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);
