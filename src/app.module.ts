import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UserModule } from './user/user.module';
import { ApiController } from './api/api.controller';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [UserModule],
  controllers: [ApiController, AppController, UsersController],
  providers: [AppService, UsersService, EmailService],
})
export class AppModule {}
