import { MiddlewareConsumer, Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import * as Joi from "joi";
import { DataSource } from "typeorm";
import { RequestContextModule } from "nestjs-request-context";

import dbConf from "./config/database.config";
import tknConf from "./config/tokens.config";
import appConf from "./config/app.config";
import scrConf from "./config/secrets.config";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

import { LoggerModule } from "./logger/logger.module";
import LoggerMiddleware from "./logger/logger.middleware";

@Module({
  imports: [
    RequestContextModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [dbConf, tknConf, appConf, scrConf],
      validationSchema: Joi.object({
        APP_MODE: Joi.string()
          .valid("development", "production")
          .default("development")
          .required(),
        APP_HOST: Joi.string().default("localhost"),
        APP_PORT_BACK: Joi.number().default(3000),
        APP_PORT_FRONT: Joi.number(),
        APP_PROTOCOL: Joi.string().default("https"),
        API_TOKEN_STEAM: Joi.string().required(),
        DATABASE_HOST: Joi.string().default("localhost"),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        SECRET_SESSION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST"),
        port: +configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: configService.get("APP_MODE") === "development",
      }),
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }
}
