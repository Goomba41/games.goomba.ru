import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { randomUUID } from 'crypto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private readonly logger = new Logger('HttpException');

  catch(exception: HttpException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { method, originalUrl } = ctx.getRequest();

    const traceId: string = randomUUID();

    const logMessage = `${traceId} ${method} ${originalUrl} ${httpStatus} ${
      exception.message || ''
    }`;

    if (httpStatus >= 500) {
      this.logger.error(
        logMessage.trim(),
        exception.stack || null,
        exception.name,
        traceId,
      );
    } else if (httpStatus >= 400 && httpStatus < 500) {
      this.logger.warn(
        logMessage.trim(),
        exception.stack || null,
        exception.name,
        traceId,
      );
    } else {
      this.logger.log(logMessage.trim());
    }

    const responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      traceId,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
