import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/Modules/prisma/prisma.service';
import { AuthLoginDTO } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    // return this.jwtService.sign();
  }

  async check() {
    //
  }

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user)
      throw new UnauthorizedException('Email or password is incorrect');

    return user;
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('Email not found');

    // TO DO -> Envio de email.

    return user;
  }

  async reset(password: string, old_password: string, token: string) {
    // TO DO -> Validar token.

    const id = 0;
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('Token not found');

    if (user.password !== old_password)
      throw new UnauthorizedException('Old password is incorrect');

    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
      },
    });
  }
}
