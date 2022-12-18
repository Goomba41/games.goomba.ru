import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

import { Injectable } from '@nestjs/common';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: 'B9A7895AFEE1428F9CB5542D50BEE12D',
    });
  }

  async validate(identifier, profile, done) {
    // User.findByOpenID({ openId: identifier }, function (err, user) {
    //     return done(err, user);
    // });
    console.log(identifier);
    console.log(profile);
    return done();
  }
}
