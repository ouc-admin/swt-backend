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
import { JwtModule } from '@nestjs/jwt';
import { EMailService } from './mail/mail.service';
import { AuthService } from './user/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PrismaModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AppController, MailController],
  providers: [
    AppService,
    SendgridService,
    PrismaService,
    UserService,
    EMailService,
    AuthService,
  ],
})
export class AppModule {}
