import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-steam';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steamSignin') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const isDev = configService.get<string>('app.mode') === 'development';
    const host = configService.get<string>('app.host');
    const port = configService.get<string>('app.portB');
    const protocol = configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}:${port}` : host;

    super({
      returnURL: `${protocol}://${hostname}/api/auth/steam/signin/success`,
      realm: `${protocol}://${hostname}/`,
      apiKey: configService.get<string>('tokens.steam'),
    });
  }

  async validate(identifier, profile) {
    const profileJson = profile._json;
    const profileSteamId = profile._json.steamid;

    const signedin = await this.usersService.signin(profileSteamId);
    if (signedin) {
      return profileJson;
    } else {
      throw new UnauthorizedException('Unauthorized', {
        cause: new Error(), // https://nodejs.org/en/blog/release/v16.9.0/#error-cause
        description: 'User is not registered, need to sign up',
      });
    }
  }
}

@Injectable()
export class SteamRegStrategy extends PassportStrategy(
  Strategy,
  'steamSignup',
) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const isDev = configService.get<string>('app.mode') === 'development';
    const host = configService.get<string>('app.host');
    const port = configService.get<string>('app.portB');
    const protocol = configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}:${port}` : host;

    super({
      returnURL: `${protocol}://${hostname}/api/auth/steam/signup/success`,
      realm: `${protocol}://${hostname}/`,
      apiKey: configService.get<string>('tokens.steam'),
    });
  }

  async validate(identifier, profile, done) {
    const profileJson = profile._json;
    const profileSteamId = profile._json.steamid;

    if (profile._json.communityvisibilitystate !== 3)
      // return done('Profile is not public', null);
      throw new UnauthorizedException('Unauthorized', {
        cause: new Error(), // https://nodejs.org/en/blog/release/v16.9.0/#error-cause
        description: 'Profile is not public',
      });

    const signedin = await this.usersService.signin(profileSteamId);
    if (signedin) {
      return profileJson;
    }

    await this.usersService.create(profileJson).then(() => {
      return profileJson;
    });

    throw new HttpException('Internal server error', 500);
  }
}
