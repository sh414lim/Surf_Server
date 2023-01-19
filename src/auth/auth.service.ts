import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from '../config/authConfig';
import * as jwt from 'jsonwebtoken';
interface User {
  id: String;
  name: string;
  email: string;
}
@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(user: User) {
    const payload = { ...user };
    console.log(payload);

    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }
}
