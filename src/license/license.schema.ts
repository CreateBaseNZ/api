import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LicenseDocument = License & mongoose.Document;

@Schema()
export class License {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  group: mongoose.Schema.Types.ObjectId;

  @Prop()
  role: string;

  @Prop()
  classes: mongoose.Schema.Types.ObjectId[];

  @Prop(
    raw({
      created: { type: String },
      modified: { type: String },
      joined: { type: String },
      deactivated: { type: String },
    }),
  )
  date: Record<string, any>;

  @Prop()
  status: string;

  @Prop()
  metadata: mongoose.Schema.Types.Mixed;

  @Prop()
  profile: mongoose.Schema.Types.ObjectId;
}

export const LicenseSchema = SchemaFactory.createForClass(License);
