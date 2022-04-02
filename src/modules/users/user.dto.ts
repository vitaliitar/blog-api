import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  name: string;
}

export class CreateChargeDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsNumber()
  amount: number;
}
