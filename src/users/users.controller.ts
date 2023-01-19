import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Headers,
  UseGuards, // 컨트롤러에서 헤더를 직접 다루기 위해 HEADER 데커레이터를 가져온다
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guard/authGuard.guard';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  //가드를 이용한 인가 처리
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    return this.usersService.getUserInfo(userId);
  }

  // @Get(':id')
  // async getUserInfo(
  //   @Headers() headers: any,
  //   @Param('id') userId: string,
  // ): Promise<UserInfo> {
  //   const jwtString = headers.authorization.split('Bearer ')[1];
  //   this.authService.verify('Bearer ')[1];

  //   return this.usersService.getUserInfo(userId);
  // }

  // @Get('/:id')
  // async getUserInfo(
  //   @Headers() headers: any,
  //   @Param('id') userId: string,
  // ): Promise<UserInfo> {
  //   const jwtString = headers. .split('Bearer'); // 헤더에서 JWT 를 파싱

  //   this.authService.verify(jwtString); // jwt 가 서버에서 발급한것인지를 검증

  //   return await this.usersService.getUserInfo(userId); // UserService 통해 JWT 토큰을 검증하는 로직을 작성
  // }
}
