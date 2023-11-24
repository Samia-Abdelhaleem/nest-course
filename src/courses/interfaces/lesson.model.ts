import { IsInt, IsString } from 'class-validator';

export class Lesson {
  @IsInt()
  id: number;
  @IsString()
  description: string;
  @IsString()
  duration: string;
  @IsInt()
  seqNo: number;
  @IsInt()
  courseId: number;
}
