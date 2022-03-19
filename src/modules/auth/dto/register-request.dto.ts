import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterRequest {
  @IsNotEmpty({ message: 'An username is required' })
  readonly username: string;

  @IsNotEmpty({ message: 'A password is required' })
  @MinLength(6, { message: 'Your password must be at least 6 characters' })
  readonly password: string;
}
