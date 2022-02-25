import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DataDocument = Data & mongoose.Document;

@Schema()
export class Data {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop()
  project: string;

  @Prop(
    raw({
      failed: { type: String },
      succeeded: { type: String },
    }),
  )
  date: Record<string, any>;
}

export const DataSchema = SchemaFactory.createForClass(Data);
