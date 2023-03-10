import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

//CanActiVate 인터페이스 구현

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    // 인수로 ExecutionContext 인스턴스를 인수로 받는다 -  ExecutionContext 는 ArgumentHost 를 상속 받는다(요청과 응답에 대한 정보를 가지고 있다.)
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); // switchToHttp 함수를 사용하여 필요한 정보를 가져 올 수 있다.
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    console.log(request.headers.authorization);
    console.log(request.headers);
    const jwtString = request.headers.authorization.split('Bearer ')[1];

    this.authService.verify(jwtString);

    return true;
  }
}
