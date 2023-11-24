import { Injectable } from '@nestjs/common';
import { Course } from 'src/courses/interfaces/course.model';
import { CoursesRepositoryService } from 'src/courses/repositories/courses.repository';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepositoryService: CoursesRepositoryService,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.coursesRepositoryService.findAll();
  }
  async updateCourse(courseId: string, changes: Partial<Course>) {
    return this.coursesRepositoryService.updateCourse(courseId, changes);
  }

  async deleteCourse(courseId: string) {
    return this.coursesRepositoryService.deleteCourse(courseId);
  }

  async createCourse(course: Partial<Course>) {
    return this.coursesRepositoryService.createCourse(course);
  }

  async findCourseByUrl(courseUrl: string) {
    return this.coursesRepositoryService.findCourseByUrl(courseUrl);
  }
}
