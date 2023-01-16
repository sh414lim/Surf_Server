import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  VersioningType,
} from '@nestjs/common';
import { UserInfo } from './UserInfo';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { VerifyEmailDto } from 'src/user/dto/verify-email.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} // UsersService  를 컨트롤러에 주입

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password); // dto 에서 얻은 정보를 UserService 에 전달
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

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<string> {
    return await this.usersService.getUserInfo(userId);
  }

  //   @Post()
  //   create(@Body() createUserDto: CreateUserDto) {
  //     const { name, email, password } = createUserDto;
  //     return `유저를 생성하엿습니다 name :  ${name}, email : ${email}`;
  //   }

  //   @Post('/email-verify')
  //   async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
  //     console.log(dto);
  //     return;
  //   }

  //   @Post('/login')
  //   async login(@Body() dto: UserLoginDto): Promise<string> {
  //     console.log(dto);
  //     return;
  //   }

  //   @Get('/:id')
  //   async getUserInfo(@Param('id') userid: string): Promise<UserInfo> {
  //     console.log(userid);
  //     return;
  //   }
}
