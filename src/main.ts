import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.filter';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value} ${Object.values(
              error.constraints,
            ).join(',')}`,
        );
        return new ValidationException(messages);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
