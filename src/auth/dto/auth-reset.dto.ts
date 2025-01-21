import { IsString } from 'class-validator';
import { AuthForgetDTO } from './auth-forget.dto';

export class AuthResetDTO extends AuthForgetDTO {
  @IsString()
  old_password: string;
}
