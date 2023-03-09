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
import { SteamStrategy } from 'src/auth/steam.strategy';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly strategy: SteamStrategy,
  ) {}

  private readonly logger = new Logger('HttpException');

  catch(exception: HttpException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

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

    const authErrorsCodes: number[] = [401, 403];

    if (authErrorsCodes.includes(httpStatus)) {
      response.cookie('Unauthorized', 404);
      response.redirect(303, this.strategy.failureRedirect);
      //   httpAdapter.redirect(response, 302, this.strategy.failureRedirect);
    } else {
      httpAdapter.reply(response, responseBody, httpStatus);
    }
  }
}
