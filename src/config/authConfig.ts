import { ConfigModule, registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  inject: [ConfigModule],
  jwtSecret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1d' },
}));
