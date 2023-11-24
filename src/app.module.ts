import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GetUserMiddleware } from './middleWares/get-user.middleware';
import { CoursesController } from './courses/controllers/courses.controller';
import { LessonsController } from './courses/controllers/lessons.controller';

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATA_BASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(CoursesController, LessonsController);
  }
}
