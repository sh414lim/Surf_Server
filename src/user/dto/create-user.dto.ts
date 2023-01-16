import { Body, Post } from '@nestjs/common';
import { create } from 'domain';
import { StringArraySupportOption } from 'prettier';

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
