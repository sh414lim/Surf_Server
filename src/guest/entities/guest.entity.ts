import { Field, Int, ObjectType } from '@nestjs/graphql';
import { string } from 'joi';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Guest {
  @PrimaryGeneratedColumn()
  @Field((is) => Int)
  id: number;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  email: string;

  // @Field((type) => string)
  // password: string;
}
