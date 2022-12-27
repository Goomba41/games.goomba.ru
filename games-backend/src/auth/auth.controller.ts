import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Redirect,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SteamAuthGuard, SteamRegGuard } from './steam.guard';
import { IsAuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(AuthController.name);

  @Get('steam/signin')
  @UseGuards(SteamAuthGuard)
  async signin() {
    // call redirect to steam login page
  }

  @Get('steam/signup')
  @UseGuards(SteamRegGuard)
  async signup() {
    // call redirect to steam login page
  }

  @Get('steam/signin/success')
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

  @Get('steam/signup/success')
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

  @Get('signout')
  @UseGuards(IsAuthenticatedGuard)
  async signout(@Req() request) {
    const user: string = request.session.passport.user.steamid;

    const logoutError = await new Promise((resolve) => {
      request.logOut({ keepSessionInfo: false }, (error) => resolve(error));
    });

    if (logoutError) {
      console.error(logoutError);

      throw new InternalServerErrorException(`Could not log out user ${user}`);
    }

    this.logger.log(`User ${user} is sign out`);

    return {
      logout: true,
    };
  }

  @Get('check')
  async state(@Session() session, @Req() request) {
    if (request.isAuthenticated()) {
      return {
        authenticated: request.isAuthenticated(),
        user: request.session.passport.user,
      };
    }
    return {
      authenticated: request.isAuthenticated(),
      user: null,
    };
  }
}
