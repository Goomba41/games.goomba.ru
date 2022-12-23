import { Controller, Get, Param, Session, UseGuards } from '@nestjs/common';
import { Session as ExpressSession } from 'express-session';

import { IsAuthenticatedGuard } from 'src/auth/authenticated.guard';

import User from './users.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(IsAuthenticatedGuard)
  @Get()
  readAll(@Session() session: ExpressSession): Promise<User[]> {
    console.log(session);
    return this.usersService.readAll();
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get(':id')
  readOne(@Param() params): Promise<User> {
    return this.usersService.readOne(params.id);
  }
}
