import { Controller, Get, Param } from '@nestjs/common';

import { User } from './users.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //   @Post()
  //   async register() {
  //     this.usersService.register();
  //   };
  // @Post()
  // async signIn() {
  //   this.usersService.signIn();
  // }

  @Get()
  readAll(): Promise<User[]> {
    return this.usersService.readAll();
  }

  @Get(':id')
  readOne(@Param() params): string {
    console.log(params.id);
    return `find one by steamid ${params.id}`;
  }
}
