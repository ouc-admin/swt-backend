import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'I have changed the code and pushed it. Now lets check it.';
  }
}
