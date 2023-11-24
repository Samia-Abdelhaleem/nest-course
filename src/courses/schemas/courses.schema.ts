import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Course {
  @Prop()
  _id: string;
  @Prop({ required: true })
  seqNo: number;
  @Prop()
  url: string;
  @Prop()
  iconUrl: string;
  @Prop()
  courseListIcon: string;
  @Prop()
  description: string;
  @Prop()
  longDescription?: string;
  @Prop()
  category: string;
  @Prop()
  lessonsCount: number;
  @Prop()
  promo: boolean;
}

export const CoursesSchema = SchemaFactory.createForClass(Course);
