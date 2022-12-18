import { Controller, Get, UseGuards } from '@nestjs/common';

import { SteamAuthGuard } from './steam.guard';

@Controller('api/auth')
export class AuthController {
  @Get('steam')
  @UseGuards(SteamAuthGuard)
  async signin() {
    // call redirect to steam login page
  }
}
