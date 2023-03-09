import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class SteamAuthGuard extends AuthGuard("steamSignin") {}
export class SteamRegGuard extends AuthGuard("steamSignup") {}
