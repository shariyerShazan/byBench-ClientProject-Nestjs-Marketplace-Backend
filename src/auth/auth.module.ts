import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { OtpMailService } from 'src/mail/otp-mail.service';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MailService],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
