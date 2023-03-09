import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from "passport-steam";

import { UsersService } from "src/users/users.service";

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, "steamSignin") {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    const isDev = configService.get<string>("app.mode") === "development";
    const host = configService.get<string>("app.host");
    const portB = configService.get<string>("app.portB");
    const portF = configService.get<string>("app.portF");
    const protocol = configService.get<string>("app.protocol");
    const hostnameB = isDev ? `${host}:${portB}` : host;
    const hostnameF = isDev ? `${host}:${portF}` : host;

    super({
      returnURL: `${protocol}://${hostnameB}/api/auth/steam/signin/success`,
      realm: `${protocol}://${hostnameB}/`,
      apiKey: configService.get<string>("tokens.steam"),
    });

    this.successRedirect = `${protocol}://${hostnameF}/`;
    this.failureRedirect = `${protocol}://${hostnameF}/login`;
  }

  async validate(identifier, profile) {
    const profileJson = profile._json;
    const profileSteamId = profile._json.steamid;

    const signedin = await this.usersService.signin(profileSteamId);
    if (signedin) {
      return profileJson;
    } else {
      throw new UnauthorizedException(
        "User is not registered, need to sign up"
      );
    }
  }

  public successRedirect: string;
  public failureRedirect: string;
}

@Injectable()
export class SteamRegStrategy extends PassportStrategy(
  Strategy,
  "steamSignup"
) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    const isDev = configService.get<string>("app.mode") === "development";
    const host = configService.get<string>("app.host");
    const port = configService.get<string>("app.portB");
    const protocol = configService.get<string>("app.protocol");
    const hostname = isDev ? `${host}:${port}` : host;

    super({
      returnURL: `${protocol}://${hostname}/api/auth/steam/signup/success`,
      realm: `${protocol}://${hostname}/`,
      apiKey: configService.get<string>("tokens.steam"),
    });
  }

  async validate(identifier, profile, done) {
    const profileJson = profile._json;
    const profileSteamId = profile._json.steamid;

    if (profile._json.communityvisibilitystate !== 3) {
      throw new UnauthorizedException("Profile is not public");
    } else {
      const signedin = await this.usersService.signin(profileSteamId);
      if (signedin) {
        return profileJson;
      } else {
        await this.usersService.create(profileJson);
        return profileJson;
      }
    }
  }
}
