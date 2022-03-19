import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: 'A username is required' })
  readonly username: string;

  @IsNotEmpty({ message: 'A password is required to login' })
  readonly password: string;
}
