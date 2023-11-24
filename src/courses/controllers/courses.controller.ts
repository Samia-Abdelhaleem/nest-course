import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Course } from 'src/courses/interfaces/course.model';
import { CoursesService } from '../services/courses.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('courses')
// @UseFilters(new HttpExceptionFilter())
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async createCourse(@Body() course: Course): Promise<Course> {
    return this.coursesService.createCourse(course);
  }
  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':url')
  async FindCourseByUrl(@Param('url') courseUrl: string) {
    const course = await this.coursesService.findCourseByUrl(courseUrl);
    if (!course) {
      throw new NotFoundException(`could not find course for url ${courseUrl}`);
    }
    return course;
  }

  @Put(':courseId')
  @UseGuards(AdminGuard)
  async updateCourse(
    @Param('courseId') courseId: string,
    // @Body('seqNo', ToIntegerPipe) seqNo: number,
    @Body() changes: Course,
  ): Promise<Course> {
    // console.log('seqNo value : ', seqNo, 'type of seqNo :', typeof seqNo);
    if (changes._id) {
      throw new BadRequestException("can't update this course ");
    }
    return this.coursesService.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.coursesService.deleteCourse(courseId);
  }
}
