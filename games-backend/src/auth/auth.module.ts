import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { SteamStrategy, SteamRegStrategy } from './steam.strategy';

@Module({
  providers: [AuthService, SteamStrategy, SteamRegStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
