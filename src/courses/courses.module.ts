import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesSchema } from 'src/courses/schemas/courses.schema';
import { CoursesRepositoryService } from 'src/courses/repositories/courses.repository';
import { LessonsSchema } from 'src/courses/schemas/lessons.schema';
import { LessonsController } from './controllers/lessons.controller';
import { LessonsRepositoryService } from './repositories/lessons.repository';
import { LessonsService } from './services/lessons.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Courses', schema: CoursesSchema },
      { name: 'Lessons', schema: LessonsSchema },
    ]),
  ],
  controllers: [CoursesController, LessonsController],
  providers: [
    CoursesService,
    LessonsService,
    CoursesRepositoryService,
    LessonsRepositoryService,
  ],
})
export class CoursesModule {}
