import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    // JwtModule.registerAsync({
    //   inject: [ConfigModule],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '1d' },
    //   }),
    // }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
