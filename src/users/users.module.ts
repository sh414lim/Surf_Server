import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    EmailModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity]), // usersModule 에서 forfeture() 메서드로 유저 모듈 내에서 사용할 저장서 등록
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
