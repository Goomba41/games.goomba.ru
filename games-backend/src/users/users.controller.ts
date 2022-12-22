import { Controller, Get, Param } from '@nestjs/common';

import { User } from './users.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  readAll(): Promise<User[]> {
    return this.usersService.readAll();
  }

  @Get(':id')
  readOne(@Param() params): Promise<User> {
    return this.usersService.readOne(params.id);
  }
}
