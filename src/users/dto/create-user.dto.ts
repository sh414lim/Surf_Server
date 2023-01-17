import { Body, Param, Post } from '@nestjs/common';
import { create } from 'domain';
import { StringArraySupportOption } from 'prettier';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator'; // class-validator
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform((params) => params.value.trim())
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  readonly password: string;
}
