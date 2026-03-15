import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { sendOtpEmail } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // SIGNUP
  async signup(name: string, email: string, password: string) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: false,
    });

    await this.userRepo.save(user);
    await sendOtpEmail(email, otp);

    return {
      message: 'OTP sent to your email',
    };
  }

  // VERIFY OTP
  async verifyOtp(email: string, otp: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user || user.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    user.isVerified = true;
    user.otp = null;

    await this.userRepo.save(user);

    return {
      message: 'Email verified successfully',
    };
  }

  // LOGIN
  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
