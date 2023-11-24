import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, Request } from 'express';
import { ValidationException } from './validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    return response.status(statusCode).json({
      statusCode: statusCode,
      errorMessage: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      createdBy: 'ValidationFilter',
      validationErrors: exception.validationErrors,
    });
  }
}
