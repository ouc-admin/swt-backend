import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserType } from './types/user.type';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(): Promise<UserType> {
    return {
      name: 'Chinmay',
    };
  }

  async createUser(user: UserDto): Promise<UserType> {
    const u = this.prismaService.user.create({
      data: {
        name: user.name,
      },
    });
    return u;
  }
}
