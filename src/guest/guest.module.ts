import { Module } from '@nestjs/common';
import { GuestResolver } from './guest.resolver';

@Module({
  providers: [GuestResolver],
})
export class GuestModule {}
