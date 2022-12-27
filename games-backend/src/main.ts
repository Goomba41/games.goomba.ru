import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import CustomLogger from './logger/logger';
import { AllExceptionsFilter } from './utils/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);

  const port = configService.get('APP_PORT_BACK');

  app.setGlobalPrefix('api/');

  app.useLogger(app.get(CustomLogger));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen(port);
}
bootstrap();
