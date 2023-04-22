import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail/mail.controller';
import { SendgridService } from './sendgrid/sendgrid.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { UserService } from './user/user.service';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PrismaModule],
  controllers: [AppController, MailController],
  providers: [AppService, SendgridService, PrismaService, UserService],
})
export class AppModule {}
