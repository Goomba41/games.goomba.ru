import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import CustomLogger from './logger';
import LogsService from './logger.service';
import Log from './logger.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Log])],
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger],
})
export class LoggerModule {}
