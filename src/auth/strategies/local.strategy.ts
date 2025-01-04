import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(credentials: LoginUserDto) {
    console.log('authentication passport strategy: ', credentials);
    const user = await this.authService.authenticate(credentials)

    console.log('user is: ', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
