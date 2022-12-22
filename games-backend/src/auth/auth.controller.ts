import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SteamAuthGuard, SteamRegGuard } from './steam.guard';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Get('steam')
  @UseGuards(SteamAuthGuard)
  async signin() {
    // call redirect to steam login page
  }

  @Get('steam/registration')
  @UseGuards(SteamRegGuard)
  async register() {
    // call redirect to steam login page
  }

  @Get('steam/signin')
  @Redirect()
  @UseGuards(SteamAuthGuard)
  async steamSignin() {
    const isDev = this.configService.get<string>('app.mode') === 'development';
    const host = this.configService.get<string>('app.host');
    const port = this.configService.get<string>('app.portF');
    const protocol = this.configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}${port ? ':' : ''}${port}` : host;

    return { url: `${protocol}://${hostname}/` };
  }

  @Get('steam/registered')
  @Redirect()
  @UseGuards(SteamRegGuard)
  async steamRegister() {
    const isDev = this.configService.get<string>('app.mode') === 'development';
    const host = this.configService.get<string>('app.host');
    const port = this.configService.get<string>('app.portF');
    const protocol = this.configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}${port ? ':' : ''}${port}` : host;

    return { url: `${protocol}://${hostname}/` };
  }
}
