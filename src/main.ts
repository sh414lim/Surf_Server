import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware3 } from './middleware/logger.middleware';
import { AuthGuard } from './guard/authGuard.guard';

dotenv.config({
  // dotenv 환경 설정  -
  path: path.resolve(
    process.env.NODE_ENV === ' production'
      ? '.production.env'
      : process.env.NODE_ENV === 'stage'
      ? '.stage.env'
      : '.development.env',
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware3);
  // app.useGlobalGuards(new AuthGuard()) //전역 가드 설정
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(8000);
}
bootstrap();
