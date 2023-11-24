import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Lesson {
  @Prop()
  _id: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  seqNo: number;
  @Prop()
  duration: string;
  @Prop({ type: Types.ObjectId, ref: 'Courses' })
  courseId: Types.ObjectId;
}

export const LessonsSchema = SchemaFactory.createForClass(Lesson);
