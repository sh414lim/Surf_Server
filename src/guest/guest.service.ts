import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class GuestService {
  @Get()
  async getHello() {
    return 'graphlq';
  }
}
