import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/Modules/prisma/prisma.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { User } from '@prisma/client';
import { UserService } from 'src/Modules/Users/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';

interface IToken {
  id: number;
  sub: number;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      acessToken: this.jwtService.sign(
        {
          id: user.id,
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '3 hours',
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string): IToken {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (error) {
      throw new UnauthorizedException('Token invalid: ' + error.message);
    }
  }

  async login({ email, password }: AuthLoginDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user)
      throw new UnauthorizedException('Email or password is incorrect');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return this.createToken(user);
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
    try {
      const data: IToken = await this.checkToken(token);
      const { sub } = data;
      const user = await this.prisma.user.findUnique({
        where: {
          id: sub,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      if (user.password !== old_password)
        throw new UnauthorizedException('Old password is incorrect');

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password,
        },
      });

      return this.createToken(user);
    } catch (error) {
      throw new UnauthorizedException('Token invalid: ' + error.message);
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }

  isValidToken(token: string): boolean {
    try {
      this.checkToken(token);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
  }
}
