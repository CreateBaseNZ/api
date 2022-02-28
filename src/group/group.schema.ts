import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type GroupDocument = Group & mongoose.Document;

@Schema()
export class Group {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  number: number;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop(
    raw({
      address: { type: String },
      city: { type: String },
      country: { type: String },
    }),
  )
  location: Record<string, any>;

  @Prop()
  classes: mongoose.Schema.Types.ObjectId[];

  @Prop(
    raw({
      active: { type: [mongoose.Schema.Types.ObjectId] },
      queue: { type: [mongoose.Schema.Types.ObjectId] },
      inactive: { type: [mongoose.Schema.Types.ObjectId] },
    }),
  )
  licenses: Record<string, any>;

  @Prop()
  join: mongoose.Schema.Types.Mixed;

  @Prop(
    raw({
      created: { type: String },
      modified: { type: String },
      verified: { type: String },
    }),
  )
  date: Record<string, any>;

  @Prop()
  verified: boolean;

  @Prop()
  payment: mongoose.Schema.Types.ObjectId[];

  @Prop(
    raw({
      name: { type: mongoose.Schema.Types.String },
      location: {
        country: { type: mongoose.Schema.Types.String },
      },
    }),
  )
  lowerCase: Record<string, any>;

  @Prop()
  metadata: mongoose.Schema.Types.Mixed;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
