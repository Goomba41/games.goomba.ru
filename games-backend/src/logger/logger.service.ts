import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import Log from './logger.entity';

export interface ILog {
  id?: string;
  context: string;
  message: string;
  level: string;
  stack?: string;
  creationDate?: Date;
}

@Injectable()
export default class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  async createLog(log: ILog) {
    const newLog = await this.logsRepository.create(log);
    await this.logsRepository.save(newLog);
    return newLog;
  }
}
