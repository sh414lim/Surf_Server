import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHellos(): string {
    return process.env.DATABASE_HOST;
  }

  @Get('/*ello')
  getHello(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }
}
