import { Controller, Get, Param, Session } from '@nestjs/common';
import { Session as ExpressSession } from 'express-session';

import User from './users.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  readAll(@Session() session: ExpressSession): Promise<User[]> {
    console.log(session);
    return this.usersService.readAll();
  }

  @Get(':id')
  readOne(@Param() params): Promise<User> {
    return this.usersService.readOne(params.id);
  }
}
