import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { ErrorType, UserType } from './types/user.type';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  // method to create a new User in database
  async signup(user: UserDto): Promise<UserType | ErrorType> {
    // see if email is in use
    const findUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (findUser) {
      return {
        message: 'User is already exists.',
        type: 'error',
      };
    }

    // Hash the users password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // create a new user and save it
    const newUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    // return the user
    return newUser;
  }

  // method to signin a user with email and password
  async signin(user: UserDto): Promise<UserType | ErrorType> {
    // see if user exists or not with given email
    const findUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!findUser) {
      return {
        message: 'User not found.',
        type: 'error',
      };
    }

    // compare the password with bcrypt
    const isMatch = await bcrypt.compare(user.password, findUser.password);

    if (isMatch) {
      // password is okay let's login by creating a JWT token

      // omitting password from user fetched from database
      type UserPreview = Omit<UserType, 'password'>;

      const validUser: UserPreview = {
        email: findUser.email,
        name: findUser.name,
        token: 'sample token',
      };

      return validUser;
    } else {
      return {
        message: 'Credentials are not valid',
        type: 'error',
      };
    }
  }
}
