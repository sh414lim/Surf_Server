import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guard/authGuard.guard';

@UseGuards(AuthGuard) // 컨트롤범위 또는 메서드 범위를 적용
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
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
