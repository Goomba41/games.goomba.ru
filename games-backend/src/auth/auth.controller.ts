import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';

import { SteamAuthGuard } from './steam.guard';

@Controller('api/auth')
export class AuthController {
  @Get('steam')
  @UseGuards(SteamAuthGuard)
  async signin() {
    // call redirect to steam login page
  }

  @Get('steam/return')
  @Redirect('http://localhost:5173/')
  @UseGuards(SteamAuthGuard)
  async steamResult() {
    // call redirect to steam main page if pass validation
  }
}
