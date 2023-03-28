import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";

import { IsAuthenticatedGuard } from "src/auth/authenticated.guard";

import { User, ProfileDecorations } from "../types/users.types";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(IsAuthenticatedGuard)
  @Get("test")
  test() {
    this.usersService.logInSteam();
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get(":id")
  readOne(@Param() params): Promise<User> {
    return this.usersService.readOne(params.id);
  }

  @UseGuards(IsAuthenticatedGuard)
  @Patch("decorations")
  async updateDecorations(): Promise<ProfileDecorations> {
    return this.usersService.updateDecorations();
  }
}
