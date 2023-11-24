import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course } from 'src/courses/schemas/courses.schema';

@Injectable()
export class CoursesRepositoryService {
  constructor(@InjectModel('Courses') private courseModel: Model<Course>) {}
  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async updateCourse(
    courseId: string,
    changes: Partial<Course>,
  ): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(
      {
        _id: courseId,
      },
      changes,
      { new: true },
    );
  }

  async deleteCourse(courseId: string) {
    return this.courseModel.findByIdAndDelete({ _id: courseId });
  }

  async createCourse(course: Partial<Course>) {
    const newCourse = new this.courseModel({
      ...course,
      _id: new mongoose.Types.ObjectId(),
    });
    return newCourse.save();
  }

  async findCourseByUrl(courseUrl: string) {
    return this.courseModel.findOne({ url: courseUrl });
  }
}
