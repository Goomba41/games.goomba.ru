import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SteamAuthGuard } from './steam.guard';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Get('steam')
  @UseGuards(SteamAuthGuard)
  async signin() {
    // call redirect to steam login page
  }

  @Get('steam/return')
  @Redirect()
  @UseGuards(SteamAuthGuard)
  async steamResult() {
    const isDev = this.configService.get<string>('app.mode') === 'development';
    const host = this.configService.get<string>('app.host');
    const port = this.configService.get<string>('app.port');
    const protocol = this.configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}:${port}` : host;

    return { url: `${protocol}://${hostname}/` };
  }
}
