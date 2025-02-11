import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Modules/Users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
