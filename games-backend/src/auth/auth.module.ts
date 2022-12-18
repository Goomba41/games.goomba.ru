import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { SteamStrategy } from './steam.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, SteamStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
