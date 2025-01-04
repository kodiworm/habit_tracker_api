import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';
import {RegisterUserDto} from "./dto/register-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: LoginUserDto) {
    return this.authService.authenticate(credentials);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() data: RegisterUserDto) {
    return this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-v2')
  @UseGuards(PassportLocalGuard)
  loginV2(@Body() credentials: LoginUserDto) {
    // return this.authService.authenticate(credentials);
    return 'success';
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return this.authService.getUserInfo(request.user);
  }
}
