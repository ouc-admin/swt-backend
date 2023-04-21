import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserType } from './types/user.type';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/user')
  getUser(): Promise<UserType> {
    return this.userService.getUser();
  }

  @Post('/create-user')
  createUser(@Body() user: UserDto): Promise<UserType> {
    return this.userService.createUser(user);
  }
}
