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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHellos(@Req() req: Request): string {
    console.log(process.env);
    return this.appService.getHellos();
  }

  @Get('/*ello')
  getHello(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }
}
