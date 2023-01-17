import { Inject, Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import emailConfig from 'src/config/emailConfig';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
  // 메일 옵션 ->  수신자 To 메일 제목 subject html 형식 본문
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>, // 주입 받을때 @Inject 데커레이터의 토큰을 앞서 만든  ConfigFactory Key 인 email 문자 열로  넣어준디
  ) {
    console.log(config);
    this.transporter = nodemailer.createTransport({
      service: config.service, // env 파일 값\
      auth: {
        user: config.auth.user, // env 파일 값s
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;
    console.log(baseUrl);
    console.log(this.config);
    console.log(emailAddress);
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`; // 유저가 누를 버튼이 가질 링크를 구성 - 이 링크를 통해 우리 서비로 이메일 인증요청이 들어온다
    const mailOptions: EmailOptions = {
      to: 'sh414lim@micehub.com',
      subject: '가입 인증 메일',

      html: `가입 버튼 누르면 인증 완료 <br/> <form action=${url} method="POST"><button>가입확인</button> </form> `, // 메일 본문 구성
    };

    return await this.transporter.sendMail(mailOptions); // transporter 객체를 이용하여 메일을 전송
  }
}
