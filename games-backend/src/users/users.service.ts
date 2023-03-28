import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";

import axios from "axios";
// import SteamUser = require("steam-user");
// import LogOnDetailsNameToken from "steam-user";
import * as cheerio from "cheerio";
import { DateTime as dt } from "luxon";
import { RequestContext } from "nestjs-request-context/dist/request-context.model";
import { Repository } from "typeorm";

import User from "./users.entity";
import { User as SteamProfile, ProfileDecorations } from "../types/users.types";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService
  ) { }

  private readonly logger = new Logger(UsersService.name);
  private readonly steamToken: string =
    this.configService.get<string>("tokens.steam");

  create(steamProfile: SteamProfile): Promise<User> {
    const steamId = steamProfile.steamid;
    const newUser = this.usersRepository.create({ steamId });
    this.logger.log(`User with steam id ${steamId} is created`);
    return this.usersRepository.save(newUser);
  }

  async readOne(steamId: string): Promise<SteamProfile> {
    try {
      const user = await this.usersRepository.findOneBy({ steamId });
      let steamProfile: SteamProfile;

      if (user !== null) {
        await axios
          .get(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.steamToken}&steamids=${user.steamId}`
          )
          .then((response) => {
            if (
              response.status === 200 &&
              response.data.response.players.length >= 1
            ) {
              steamProfile = response.data.response.players[0];
              steamProfile.decorations = user.profileDecorations;
            } else {
              // todo error
            }
          });

        await axios
          .get(
            `http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${this.steamToken}&steamid=${user.steamId}`
          )
          .then((response) => {
            if (
              response.status === 200 &&
              response.data.response.player_level
            ) {
              steamProfile.playerlevel = response.data.response.player_level;
            } else {
              steamProfile.playerlevel = null;
            }
          });

        return steamProfile;
      } else {
        // todo error
      }
    } catch (error) { }
  }

  async updateDecorations(): Promise<ProfileDecorations> {
    try {
      const req = RequestContext.currentContext.req;
      if (req.isAuthenticated()) {
        const userSteamProfile: SteamProfile = req.session.passport.user;

        const user = await this.usersRepository.findOneBy({
          steamId: userSteamProfile.steamid,
        });

        const decorations = user.profileDecorations || {
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
    } catch (error) { }
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

  logInSteam() {
    // const req = RequestContext.currentContext.req;
    // const user = new SteamUser();
    // console.log(user);
    // user.on("loggedOn", async (user2) => {
    //   // const productInfo = await user.getProductInfo([740], []);
    //   // const appName = productInfo.apps[740].appinfo.common.name;
    //   // console.log(productInfo);
    //   // console.log(appName);
    //   console.log(user);
    //   // console.log(user2);
    //   // Gracefully logoff.
    //   // user.logOff();
    // });
    // user.logOn({
    //   // accountName: "bear_41",
    //   // password: "eo090o7m9v044abo076IvwoOI2lux6o9",
    //   steamID: req.session.passport.user.steamid,
    //   // autoRelogin: false,
    //   webLogonToken:
    //     "eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInN0ZWFtIiwgInN1YiI6ICI3NjU2MTE5ODA1MzczOTczMCIsICJhdWQiOiBbICJjbGllbnQiLCAid2ViIiwgInJlbmV3IiwgImRlcml2ZSIgXSwgImV4cCI6IDE2OTgwMTE0MjcsICJuYmYiOiAxNjcwODc0NzM5LCAiaWF0IjogMTY3OTUxNDczOSwgImp0aSI6ICIwRDFEXzIyNDQxQTFDXzUzNDNDIiwgIm9hdCI6IDE2Nzk1MTQ3MzksICJwZXIiOiAxLCAiaXBfc3ViamVjdCI6ICI5NC4xODEuMjI1LjI1IiwgImlwX2NvbmZpcm1lciI6ICI5NC4xODEuMjI1LjI1IiB9.hmSaGEAsqIlhVqX1GYoOiWY5OyVHbpjTocP-GKpqsbP4GL8e5a2iJJoHJ4qWGv1HyQqUExERrEIXJO2l3C_MCQ",
    // });
    // webLogonToken: "32d2afeb7a0496866d814c07177abeef",
    // interface LogOnDetailsNameToken {
    //   accountName: string;
    //   webLogonToken: string;
    //   steamID: SteamID | string;
    //   autoRelogin?: boolean;
    // }
    // 32d2afeb7a0496866d814c07177abeef
  }
}
