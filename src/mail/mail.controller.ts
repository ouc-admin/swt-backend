import { Controller, Post, Query } from '@nestjs/common';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Controller('mail')
export class MailController {
  constructor(private readonly sendgridService: SendgridService) { }

  // Here we use query parameter to get the email that we want to send
  @Post('send-email')
  async sendEmail(@Query('email') email: string) {
    const mail = {
      to: email,
      subject: 'Hello from swt-backend',
      from: 'swt@real-cnt.com', // Fill it with your validated email on SendGrid account
      text: 'Testing email',
      html: '<h1>Hi, there</h1>',
    };

    return this.sendgridService
      .send(mail)
      .then(() => {
        console.log('email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
