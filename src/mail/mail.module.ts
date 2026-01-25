import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { OtpMailService } from './otp-mail.service';

@Module({
  providers: [MailService, OtpMailService],
  exports: [OtpMailService],
})
export class MailModule {}
