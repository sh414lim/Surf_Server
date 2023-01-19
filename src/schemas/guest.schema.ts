import { ArgsType, Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  uid: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  intro: string;

  password: string;
}

@ArgsType()
@InputType()
export class UserInputType {
  @IsEmail()
  @Field()
  email: string;

  @Field({ nullable: true })
  intro: string;

  @Field()
  password1: string;

  @Field()
  password2: string;
}
