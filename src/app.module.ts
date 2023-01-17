import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import emailCofing from './config/emailCofing';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`[${__dirname}/config/env/.${process.env.NODE_ENV}.env]`], //  node_env 의 값이 strage 이면 dist 디렉터리 아래에 존재하는 파일인 .stage.env 를 가져오나
      load: [emailCofing], // 앞에서 구성해둔 ConfigFactory 를 지정
      isGlobal: true, // 전역모듈 작동 설정 - 어느 모듈이난 사용 가능
      validationSchema, // 환경 변수의 값에 대해 유효성 검사를 수행 하도록 joi 를 이용하여 유효성 검사 객체를 작성3
    }),
  ],
  controllers: [ApiController, AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
