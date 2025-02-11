import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/Modules/prisma/prisma.module';
import { UserService } from 'src/Modules/Users/user.service';
import { UserModule } from 'src/Modules/Users/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: `tw0OSSgJ8p8qN9'^*>3#r7wPP`,
    }),
    forwardRef(() => UserModule),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
