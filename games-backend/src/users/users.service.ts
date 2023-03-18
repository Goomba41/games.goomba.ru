import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { DateTime as dt } from "luxon";
import { DeleteResult, Repository } from "typeorm";

import User from "./users.entity";

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
    private usersRepository: Repository<User>
  ) {}

  private readonly logger = new Logger(UsersService.name);

  create(steamProfile: ISteamProfile): Promise<User> {
    const steamId = steamProfile.steamid;
    const newUser = this.usersRepository.create({ steamId });
    this.logger.log(`User with steam id ${steamId} is created`);
    return this.usersRepository.save(newUser);
  }

  readOne(steamId: string): Promise<User> {
    return this.usersRepository.findOneBy({ steamId });
  }

  readAll(): Promise<User[]> {
    // return this.usersRepository.find();
    throw new InternalServerErrorException();
  }

  async delete(steamId: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(steamId);
  }

  async signIn(steamId: string): Promise<boolean> {
    const existedUser = await this.usersRepository.findOneBy({
      steamId,
    });

    if (existedUser) {
      existedUser.signIn = dt.now().toJSDate();
      this.usersRepository.save(existedUser);
      return true;
    }

    return false;
  }
}
