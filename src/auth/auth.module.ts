import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/Modules/Users/user.service';
import { PrismaModule } from 'src/Modules/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: `tw0OSSgJ8p8qN9'^*>3#r7wPP`,
    }),
    UserService,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
