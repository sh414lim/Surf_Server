import { Resolver, Query } from '@nestjs/graphql';
import { Guest } from '../guest/entities/guest.entity';

@Resolver((of) => Guest)
export class GuestResolver {
  @Query((returns) => [Guest])
  guest(): Guest[] {
    return [];
  }
}
