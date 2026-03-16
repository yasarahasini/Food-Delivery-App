import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signup(data: SignupDto) {

    const existingUser = await this.userRepo.findOne({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    await this.userRepo.save(user);

    return {
      message: "User created successfully"
    };
  }

  async login(data: LoginDto) {

    const user = await this.userRepo.findOne({
      where: { email: data.email }
    });

    if (!user) {
      throw new BadRequestException("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new BadRequestException("Invalid email or password");
    }

    return {
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}