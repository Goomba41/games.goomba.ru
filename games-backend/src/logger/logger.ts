import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';

import LoggerService from './logger.service';

@Injectable()
export default class CustomLogger extends ConsoleLogger {
  private readonly logsService: LoggerService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    logsService: LoggerService,
  ) {
    super(context, {
      ...options,
      logLevels: ['log', 'warn', 'error'],
    });

    this.logsService = logsService;
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);

    const ignoredContexts: string[] = ['RouterExplorer', 'RoutesResolver'];

    if (!ignoredContexts.includes(context))
      this.logsService.createLog({
        message,
        context,
        level: 'log',
      });
  }

  error(message: string, stack?: string, context?: string, id?: string) {
    super.error.apply(this, [message, stack, context]);

    const messageSubstrings: string[] = message.split(' ');
    messageSubstrings.shift();

    this.logsService.createLog({
      id,
      message: messageSubstrings.join(' '),
      stack,
      context,
      level: 'error',
    });
  }

  warn(message: string, context?: string, id?: string) {
    super.warn.apply(this, [message, context]);

    this.logsService.createLog({
      id,
      message,
      context,
      level: 'warn',
    });
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'debug',
    });
  }

  verbose(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'verbose',
    });
  }
}
