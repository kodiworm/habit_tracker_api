import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type SignInData = { userId: number, email: string }
type AuthResult = { accessToken: string, userId: number, email: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
