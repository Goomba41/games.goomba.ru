import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import axios from "axios";
import * as cheerio from "cheerio";
import { DateTime as dt } from "luxon";
import { RequestContext } from "nestjs-request-context/dist/request-context.model";
import { DeleteResult, Repository } from "typeorm";

import User, { IProfileDecorations } from "./users.entity";

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

  async updateDecorations(): Promise<IProfileDecorations> {
    try {
      const req = RequestContext.currentContext.req;
      if (req.isAuthenticated()) {
        const userSteamProfile: ISteamProfile = req.session.passport.user;

        const user: User = await this.usersRepository.findOneBy({
          steamId: userSteamProfile.steamid,
        });

        const decorations: IProfileDecorations = user.profileDecorations || {
          avatar: "",
          frame: "",
          background: "",
          miniProfileBackground: "",
        };

        const profileResponse = await axios.get(userSteamProfile.profileurl);

        if (profileResponse.status === 200 && profileResponse.data) {
          const profilePage = cheerio.load(profileResponse.data);

          const miniProfileId =
            profilePage("[data-miniprofile]").data("miniprofile");
          const miniProfileUrl = `https://steamcommunity.com/miniprofile/${miniProfileId}`;

          const miniProfileResponse = await axios.get(miniProfileUrl);

          if (miniProfileResponse.status === 200 && miniProfileResponse.data) {
            const miniProfile = cheerio.load(miniProfileResponse.data);

            decorations.miniProfileBackground =
              miniProfile(
                "div.miniprofile_nameplatecontainer video source[type='video/mp4']"
              ).attr("src") || "";
          }

          decorations.avatar =
            profilePage(".playerAvatarAutoSizeInner > img").attr("src") || "";
          decorations.frame =
            profilePage(
              ".playerAvatarAutoSizeInner > .profile_avatar_frame > img"
            ).attr("src") || "";
          decorations.background =
            profilePage("div.profile_page video source[type='video/mp4']").attr(
              "src"
            ) ||
            profilePage("div.profile_page")
              .css("background-image")
              .match(/(?:\(['"]?)(.*?)(?:['"]?\))/)[1]
              .replace(new RegExp("'", "g"), "") ||
            "";

          user.profileDecorations = decorations;
          this.usersRepository.save(user);

          this.logger.log(
            `User with steam id ${user.steamId} is update decorations`
          );
        }

        return decorations;
      }
    } catch (error) {}
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
