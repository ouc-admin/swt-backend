import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailVerificationDTO } from './email.dto';
import { VerifyEmailServiceReturnType } from './types/mail.type';

@Injectable()
export class EMailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyEmail(
    body: EmailVerificationDTO,
  ): Promise<VerifyEmailServiceReturnType> {
    try {
      const { email } = await this.jwtService.verifyAsync(body.token, {
        secret: this.configService.get<string>('JWT_EMAIL_VERIFICATION'),
      });
    } catch (error) {
      //   return {
      //     response: false,
      //     message: 'Internal error',
      //     error: error.message,
      //   };
      throw new UnauthorizedException();
    }

    return {
      response: true,
      message: 'Valid email.',
      error: null,
    };
  }
}
