import { Module } from '@nestjs/common';

import { SteamStrategy, SteamRegStrategy } from './steam.strategy';

import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule],
  providers: [UsersService, SteamStrategy, SteamRegStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
