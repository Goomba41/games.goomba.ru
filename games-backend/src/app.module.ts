import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, AuthModule, PassportModule],
})
export class AppModule {}
