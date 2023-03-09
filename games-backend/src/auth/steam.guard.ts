import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
// import { Request } from 'express';

@Injectable()
export class SteamAuthGuard extends AuthGuard("steamSignin") {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return result;
  }
}
export class SteamRegGuard extends AuthGuard("steamSignup") {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return result;
  }
}
