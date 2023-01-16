import { version } from '@babel/core';
import { Controller, Get } from '@nestjs/common';

@Controller({ host: ':version.api.localhost' }) // host 등록
export class ApiController {
  @Get() // 같은 경로 루트
  index(): string {
    return `HELLO,APi ${version}`; // 다른 응답
  }
}
