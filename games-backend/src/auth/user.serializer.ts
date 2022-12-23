import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import User from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: any) {
    done(null, user);
  }

  deserializeUser(steamid: string, done: any) {
    const user = this.usersService.readOne(steamid);

    if (!user) {
      return done(
        `Could not deserialize user: user with id ${steamid} could not be found`,
        null,
      );
    }

    done(null, user);
  }
}
