import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../schemas/lessons.schema';

@Injectable()
export class LessonsRepositoryService {
  constructor(@InjectModel('Lessons') private lessonsModel: Model<Lesson>) {}
  async search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  ) {
    return this.lessonsModel.find({ courseId: courseId }, null, {
      skip: pageNumber * pageSize,
      limit: pageSize,
      sort: {
        seqNo: sortOrder,
      },
    });
  }
}
