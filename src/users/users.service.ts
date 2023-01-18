import * as uuid from 'uuid';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>, // UserService 에 @InjectRepository 데커레이터로 유저 저장소 주입
    private dataSource: DataSource, // 먼저 typeorm 에 제공하는 DataSource  객체 주입
  ) {}

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);

    console.log(userExist);
    if (userExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입이 불가능합니다',
      );
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: emailAddress },
    });

    console.log(user);
    return user !== undefined; // TODO: DB 연동 후 구현
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner(); // 주입받은 DataSource  객체에서 QueryRunner 를 생성

    await this.dataSource.transaction(async (manger) => {
      const user = new UserEntity(); // 새로운 유져 엔티티 객체 생성
      user.id = ulid(); // 랜덤 스트링 pk id 생성
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await manger.save(user);

      // throw new InternalServerErrorException
    });

    // await this.userRepository.save(user); // 저장소를 이용하여 엔티티를 데이터 베이스에 저장

    return; // TODO: DB 연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    const user = await this.userRepository.findOne({
      // signupVerifyToken 으로 회원 가입 중인 유저를 찾습니다
      where: { signupVerifyToken },
    });

    if (!user) {
      // 만약 db에 저장되어있지 않다면 에러처리
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    // return this.authService.login({
    //   // authService 에 로그인 처리 요청
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    // });

    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented.');
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
