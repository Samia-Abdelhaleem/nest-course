import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception?.getStatus();
    return response.status(500).json({
      statusCode: 500,
      errorMessage: exception.message
        ? exception.message
        : 'unexpected error occurred',
      timestamp: new Date().toISOString(),
      path: request.url,
      createdBy: 'FallbackExceptionFilter',
    });
  }
}
