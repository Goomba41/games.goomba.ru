import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import * as expressSession from 'express-session';
import * as passport from 'passport';
import * as pgSession from 'connect-pg-simple';

import { SteamStrategy, SteamRegStrategy } from './steam.strategy';

import { AuthController } from './auth.controller';
import { UserSerializer } from './user.serializer';

import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [UsersService, SteamStrategy, SteamRegStrategy, UserSerializer],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  constructor(private configService: ConfigService) {}

  secure = this.configService.get('app.mode') !== 'development';
  host = this.configService.get('database.host');
  port = +this.configService.get('database.port');
  user = this.configService.get('database.user');
  password = this.configService.get('database.password');
  database = this.configService.get('database.name');

  secret = this.configService.get<string>('secrets.session');

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        expressSession({
          store: new (pgSession(expressSession))({
            // Insert connect-pg-simple options here
            // conString:'postgres://<user>:<database_password>@<hostname>:<port>/<database_name';
            conString: `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`,
            createTableIfMissing: true,
            schemaName: 'games',
          }),
          secret: this.secret,
          resave: false,
          saveUninitialized: false,
          cookie: {
            // maxAge: 60 * 1000,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: this.secure,
            sameSite: 'lax',
          },
          // Insert express-session options here
        }),
        passport.session(),
      )
      .forRoutes('*');
  }
}
