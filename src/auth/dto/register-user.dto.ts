import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';

export class RegisterUserDto extends PartialType(LoginUserDto) {}
