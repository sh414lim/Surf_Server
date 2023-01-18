$ yarn install

````

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
````

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov

#start
$ npm run start:dev

# 컨트롤러 생성
$ nest g controller  name

# 리소스의 CRUD 보일러 플레이트 코드 생성
$ nest g resource [name]

#컨트롤러 생성
$ nest g co Api

# 프로바이더 생성
$ nest g s Users

# email 무료 전송 라이브러리
$ npm i nodemailer
$ npm i @types/nodemailer --save-dev

# 모듈 생ㅓ
$ nest g mo Users

# node.js Node_env 설정
$ npm run start:dev 실행 시 설정

 #@nestjs.config  패키지 제공 - ConfigModule 동적 제공
 $ npm i --save @nestjs/config

 ## Mysql 설정 -> docker
$ docker run --name [name] -e MYSQL_ROOT_PASSWORD=[pwd] -d -p 3306:3306 mysql:8

## mysql docker 컨테이 너  접ㄱ
$ docker exec -it [name] bash
- mysql -u root -p

## 커스텀 트랜잭션

    await queryRunner.connect(); // QueryRunner 에서  DB에 연결한 후 트랜잭션을 시작
    await queryRunner.startTransaction; // QueryRunner 에서  DB에 연결한 후 트랜잭션을 시작

   try {
      const user = new UserEntity(); // 새로운 유져 엔티티 객체 생성
      user.id = ulid(); // 랜덤 스트링 pk id 생성
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await queryRunner.manager.save(user); // 정상 동작을 수행했다면 트랜잭션을 영속화
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      //직접 생성한 queryrunner 는 해제시켜주어야함
      await queryRunner.release();
    }
```
