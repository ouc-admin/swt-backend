import { Body, Controller, Get, Post } from '@nestjs/common';
import { ErrorType, UserType } from './types/user.type';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller()
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/create-user')
  createUser(@Body() user: UserDto): Promise<UserType | ErrorType> {
    return this.authService.signup(user);
  }
}
