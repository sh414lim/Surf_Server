import { Injectable, NestMiddleware, NestModule } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

@Injectable()
export class LoggerMiddleware2 implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Loading...');
    next();
  }
}

export function LoggerMiddleware3(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('전역 진입중.....');
  next();
}
