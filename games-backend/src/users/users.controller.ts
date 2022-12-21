import { Controller, Get, Post } from '@nestjs/common';
// import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // constructor(private usersService: UsersService) {}
  //   @Post()
  //   async register() {
  //     this.usersService.register();
  //   };
  // @Post()
  // async signIn() {
  //   this.usersService.signIn();
  // }
  @Get()
  test(): string {
    return 'find all';
  }
}
