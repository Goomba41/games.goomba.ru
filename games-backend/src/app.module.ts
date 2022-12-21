import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import dbConf from './config/database.config';
import tknConf from './config/tokens.config';
import appConf from './config/app.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'steam', session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [dbConf, tknConf, appConf],
      validationSchema: Joi.object({
        APP_MODE: Joi.string()
          .valid('development', 'production')
          .default('development')
          .required(),
        APP_HOST: Joi.string().default('localhost').required(),
        APP_PORT: Joi.number().default(3000).required(),
        APP_PROTOCOL: Joi.string().default('https').required(),
        API_TOKEN_STEAM: Joi.string().required(),
        DATABASE_HOST: Joi.string().default('localhost').required(),
        DATABASE_PORT: Joi.number().default(5432).required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
