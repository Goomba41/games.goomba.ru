import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // TODO
  create(): Promise<User> {
    // const user = new User();

    const newUser = this.usersRepository.create();
    return this.usersRepository.save(newUser);
  }

  readOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  readAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
