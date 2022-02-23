import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ClassDocument = Class & mongoose.Document;

@Schema()
export class Class {
  @Prop()
  group: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  subject: string;

  @Prop(
    raw({
      active: { type: [mongoose.Schema.Types.ObjectId] },
      requested: { type: [mongoose.Schema.Types.ObjectId] },
      invited: { type: [mongoose.Schema.Types.ObjectId] },
    }),
  )
  licenses: Record<string, any>;

  @Prop()
  metadata: mongoose.Schema.Types.Mixed;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
