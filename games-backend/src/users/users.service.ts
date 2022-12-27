import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DateTime as luxon } from 'luxon';
import { DeleteResult, Repository } from 'typeorm';

import User from './users.entity';

interface ISteamProfile {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname: string;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  loccountrycode: string;
  locstatecode: string;
  loccityid: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  create(steamProfile: ISteamProfile): Promise<User> {
    const newUser = this.usersRepository.create(steamProfile);
    this.logger.log(`User with steamid ${steamProfile.steamid} is created`);
    return this.usersRepository.save(newUser);
  }

  readOne(steamid: string): Promise<User> {
    return this.usersRepository.findOneBy({ steamid });
  }

  readAll(): Promise<User[]> {
    // return this.usersRepository.find();
    this.logger.log(`Read all users`);
    const stack = new HttpException('', 500).stack;
    throw new HttpException('Internal server error', 500, {
      cause: new Error(), // https://nodejs.org/en/blog/release/v16.9.0/#error-cause
      description: stack,
    });
  }

  async delete(steamid: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(steamid);
  }

  async signin(steamid: string): Promise<boolean> {
    const existedUser = await this.usersRepository.findOneBy({
      steamid,
    });

    if (existedUser) {
      existedUser.signin = luxon.now().toJSDate();
      this.usersRepository.save(existedUser);
      return true;
    }

    return false;
  }
}
