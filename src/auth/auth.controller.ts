import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

interface IRequestLogin {
  email: string;
  password: string;
}
/*
interface IRequestMe {
  token: string;
}
*/
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: IRequestLogin) {
    return this.authService.login({ email, password });
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, old_password, token }: AuthResetDTO) {
    return this.authService.reset(password, old_password, token);
  }

  @Post('me')
  @UseGuards(AuthGuard)
  async me() {
    return { me: 'ok' };
  }
}
