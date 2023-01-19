import { Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { GuestService } from 'src/guest/guest.service';

@Resolver()
export class GuestResolver {
  constructor(private readonly guestService: GuestService) {}
  // private readonly public 등을 적을경우 this.guestservice =  guestService 자동 세팅

  @Query(() => String)
  getHello(): string {
    return this.guestService.getHello();
  }
}
