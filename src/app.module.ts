import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import {
  LoggerMiddleware,
  LoggerMiddleware2,
} from './middleware/logger.middleware';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`], //  node_env 의 값이 strage 이면 dist 디렉터리 아래에 존재하는 파일인 .stage.env 를 가져오나
      load: [emailConfig], // 앞에서 구성해둔 ConfigFactory 를 지정
      isGlobal: true, // 전역모듈 작동 설정 - 어느 모듈이난 사용 가능
      validationSchema, // 환경 변수의 값에 대해 유효성 검사를 수행 하도록 joi 를 이용하여 유효성 검사 객체를 작성3
    }),
    TypeOrmModule.forRoot({
      // AppModule 에 typeOrmModule 을 동적 모듈로 가져온다
      type: 'mysql', // typeorm 이 다루고자 하는 데이터 베이스 타입
      host: process.env.DATABASE_HOST, //연결할 호스트 주소
      port: 3306, // 데이터베이스 에 연결을 위해 열어놓은 포트 번호 기본값:3306
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'user_info', // 데이터베이스 스키마
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 소스코드 내에 typeorm이 구동될때 인식하도록 할 엔티티 클래스의 경로를 지정
      synchronize: process.env.DATABASE_SYNCHRONUZE === 'true', // 서비스 구동시 소스 코드 기반으로 데이터베이스 스키마를 동기화 할 여부 개발의 편의를 위해 true
    }),
  ],
  controllers: [ApiController, AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, LoggerMiddleware2)
      .exclude({ path: '/users', method: RequestMethod.GET }) //users 경로로 전달된 GET 요청일 때는 LoggerMiddleware , LoggerMiddleware2 가 무시된다
      .forRoutes('/users');
  }
}
