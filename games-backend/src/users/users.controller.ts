import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";

import { IsAuthenticatedGuard } from "src/auth/authenticated.guard";

import User from "./users.entity";
import { IProfileDecorations } from "./users.entity";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(IsAuthenticatedGuard)
  @Get()
  readAll(): Promise<User[]> {
    return this.usersService.readAll();
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get(":id")
  readOne(@Param() params): Promise<User> {
    return this.usersService.readOne(params.id);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Patch("decorations")
  async updateDecorations(): Promise<IProfileDecorations> {
    return this.usersService.updateDecorations();
  }
}
