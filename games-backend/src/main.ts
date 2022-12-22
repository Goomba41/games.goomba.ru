import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const port = configService.get('APP_PORT_BACK');

  app.setGlobalPrefix('api/');

  await app.listen(port);
}
bootstrap();
