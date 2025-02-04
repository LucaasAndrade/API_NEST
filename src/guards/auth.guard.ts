import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/Modules/Users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const getRequest = context.switchToHttp().getRequest();
    const { authorization } = getRequest.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? ' ').split(' ')[1],

        getRequest.tokenPayload = data;



      );

      getRequest.tokenPayload = data;

      getRequest.user = await this.userService.findOne(Number(data.id));

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }

    return;
  }
}
