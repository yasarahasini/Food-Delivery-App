import { IsNotEmpty, IsEmail, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  paymentMethod: string;

  @IsArray()
  items: any[];

  @IsNumber()
  total: number;
}
