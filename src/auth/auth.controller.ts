import { Body, Controller, Post } from '@nestjs/common';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { UserService } from 'src/Modules/Users/user.service';
import { AuthService } from './auth.service';

interface IRequestLogin {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: IRequestLogin) {
    return this.authService.login({ email, password });
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.userService.create(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, old_password, token }: AuthResetDTO) {
    return this.authService.reset(password, old_password, token);
  }
}
