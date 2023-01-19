import { Resolver, Query } from '@nestjs/graphql';
import { Guest } from '../guest/entities/guest.entity';

@Resolver((of) => Guest)
export class GuestResolver {
  // @Query(() => Boolean)
  // ispiiz(): Boolean {
  //   return true;
  // }

  @Query((returns) => Guest)
  myGuest() {
    return true;
  }
}
