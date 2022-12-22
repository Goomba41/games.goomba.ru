import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-steam';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steamSignin') {
  constructor(private configService: ConfigService) {
    const isDev = configService.get<string>('app.mode') === 'development';
    const host = configService.get<string>('app.host');
    const port = configService.get<string>('app.portB');
    const protocol = configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}:${port}` : host;

    super({
      returnURL: `${protocol}://${hostname}/api/auth/steam/signin`,
      realm: `${protocol}://${hostname}/`,
      apiKey: configService.get<string>('tokens.steam'),
    });
  }

  async validate(identifier, profile, done) {
    // User.findByOpenID({ openId: identifier }, function (err, user) {
    //     return done(err, user);
    // });
    console.log('signin');
    return done('', profile);
  }
}

@Injectable()
export class SteamRegStrategy extends PassportStrategy(
  Strategy,
  'steamRegister',
) {
  constructor(private configService: ConfigService) {
    const isDev = configService.get<string>('app.mode') === 'development';
    const host = configService.get<string>('app.host');
    const port = configService.get<string>('app.portB');
    const protocol = configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}:${port}` : host;

    super({
      returnURL: `${protocol}://${hostname}/api/auth/steam/registered`,
      realm: `${protocol}://${hostname}/`,
      apiKey: configService.get<string>('tokens.steam'),
    });
  }

  async validate(identifier, profile, done) {
    // User.findByOpenID({ openId: identifier }, function (err, user) {
    //     return done(err, user);
    // });
    return done('', profile);
  }
}
