import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserType } from './types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
}
