import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-steam';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const isDev = configService.get<string>('app.mode') === 'development';
    const host = configService.get<string>('app.host');
    const port = configService.get<string>('app.port');
    const protocol = configService.get<string>('app.protocol');
    const hostname = isDev ? `${host}:${port}` : host;

    super({
      returnURL: `${protocol}://${hostname}/api/auth/steam/return`,
      realm: `${protocol}://${hostname}/`,
      apiKey: configService.get<string>('tokens.steam'),
    });
  }

  async validate(identifier, profile, done) {
    // User.findByOpenID({ openId: identifier }, function (err, user) {
    //     return done(err, user);
    // });
    console.log(profile);
    return done('', profile);
  }
}
