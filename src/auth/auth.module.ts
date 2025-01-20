import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: `tw0OSSgJ8p8qN9'^*>3#r7wPP`,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
