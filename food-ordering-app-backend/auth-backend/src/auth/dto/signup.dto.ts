import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}