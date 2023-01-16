import { Injectable, Post, Query } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { VerifyEmailDto } from 'src/user/dto/verify-email.dto';
import * as uuid from 'uuid';

//유저 정보를 저장 조회

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email); // 가입하려는 유저가 존재하는지 검사

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken); // 유저를 DB에 저장
    await this.sendMemberJoinEmail(email, signupVerifyToken); // 회원 가입 인증 메일 발송
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    //signupVerifyToken 회원 가입 처리중인 유저가 있는지 조회 없다면 에러처리
    // 바로 로그인이 되도록 jwt 발급
    throw new Error('Method not implementd.');
  }

  async login(email: string, password: string): Promise<string> {
    // email , password 를 가진 유저가 존재하는지 DB 에서 확인 없다면 에러처리
    // jwt 를 발급
    throw new Error('Method not Implemented');
  }

  async getUserInfo(userId: string): Promise<string> {
    // userId를 갖ㄴ 유저가 존재하는지 DB에서 확인 없다면 에러처리
    // 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented');
  }

  private checkUserExists(email: string) {
    return false; // db 연동후 구현
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; // dB 연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinverification(
      email,
      signupVerifyToken,
    );
  }
}
