/* eslint-disable prettier/prettier */
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ToIntegerPipe } from 'src/pipes/to-integer.pipe';
import { LessonsService } from '../services/lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}
  @Get()
  async searchLesson(
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder = 'asc',
    @Query('pageNumber', ToIntegerPipe) pageNumber = 0,
    @Query('pageSize', ToIntegerPipe) pageSize = 3,
  ) {
    if (!courseId) {
      throw new BadRequestException('courseId must be provided');
    }
    if (sortOrder != 'asc' && sortOrder != 'desc') {
      throw new BadRequestException('sortOrder must be asc or desc');
    }
    return this.lessonsService.search(
      courseId,
      sortOrder,
      pageNumber,
      pageSize,
    );
  }
}
