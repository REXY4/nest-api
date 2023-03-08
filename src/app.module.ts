import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { Exception } from './exception/exception';
import { ResSuccess } from './exception/response';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : [".env"],
    }),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
          __dirname + '/**/entity/*.entity{.ts,.js}',
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PingModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService,
    {
    provide: APP_FILTER,
    useClass: Exception,
  },
], 
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
