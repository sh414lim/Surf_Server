import { Body, Post } from '@nestjs/common';
import { create } from 'domain';
import { StringArraySupportOption } from 'prettier';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator'; // class-validator
export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  readonly password: string;
}
