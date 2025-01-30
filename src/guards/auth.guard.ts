import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const getRequest = context.switchToHttp().getRequest();
    const { authorization } = getRequest.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? ' ').split(' ')[1],
      );

      getRequest.tokenPayload = data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }

    return;
  }
}
