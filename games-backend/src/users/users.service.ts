import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { User } from './users.entity';

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

  // TODO
  create(steamProfile: ISteamProfile): Promise<User> {
    // const user = new User();

    // user.id = steamProfile.steamid;

    const newUser = this.usersRepository.create(steamProfile);
    return this.usersRepository.save(newUser);
  }

  readOne(steamid: string): Promise<User> {
    return this.usersRepository.findOneBy({ steamid });
  }

  readAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
