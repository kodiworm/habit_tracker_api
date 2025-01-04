import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {RegisterUserDto} from "./dto/register-user.dto";

type SignInData = { userId: number, email: string }
type AuthResult = { accessToken: string, userId: number, email: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(payload: RegisterUserDto): Promise<any> {
    try {
      const user = await this.userService.findByEmail(payload.email);

      if (user) {
        return `User already exists with email ${user.email}`;
      }

      const { password, ...rest } = payload;

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedPayload = { ...rest, password: hashedPassword };

      return await this.userService.create(updatedPayload);

    } catch (error) {
      console.error('error occurred: ', error);
      throw new InternalServerErrorException();
    }
  }

  async validateUser(credentials: LoginUserDto): Promise<SignInData> {
    const user = await this.userService.findByEmail(credentials.email);

    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

    if (user && isPasswordMatch) {
      return {
        userId: user.id,
        email: user.email,
      }
    }

    return null;
  }

  async authenticate(credentials: LoginUserDto): Promise<AuthResult | UnauthorizedException> {
    const user =  await this.validateUser(credentials);

    if (!user) {
      console.log('user is: ', user);
      return new UnauthorizedException();
    }

    const tokenPayload = {
      userId: user.userId,
      email: user.email,
    }

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      userId: user.userId,
      email: user.email,
    }
  }

  async getUserInfo(payload: SignInData) {
    try {
      const user = await this.userService.findByEmail(payload.email);

      const { password, ...result } = user;

      return result;
    }
    catch (error) {
      throw new UnauthorizedException();
    }
  }

}
