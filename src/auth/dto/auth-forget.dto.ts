import { IsJWT } from 'class-validator';
import { AuthLoginDTO } from './auth-login.dto';

export class AuthForgetDTO extends AuthLoginDTO {
  @IsJWT()
  token: string;
}
