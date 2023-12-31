import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    console.log(exception);
    return response.status(statusCode).json({
      statusCode: 500,
      errorMessage: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      createdBy: 'HttpExceptionFilter',
    });
  }
}
