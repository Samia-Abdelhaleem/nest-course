import { Injectable } from '@nestjs/common';
import { LessonsRepositoryService } from '../repositories/lessons.repository';

@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonsRepositoryService: LessonsRepositoryService,
  ) {}
  async search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  ) {
    return this.lessonsRepositoryService.search(
      courseId,
      sortOrder,
      pageNumber,
      pageSize,
    );
  }
}
