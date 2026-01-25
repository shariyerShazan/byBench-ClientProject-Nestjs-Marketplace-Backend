/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(to: string, subject: string, html: string) {
    return await this.transporter.sendMail({
      from: '"ByBench Support" <shariyershazan1@gmail.com>',
      to,
      subject,
      html,
    });
  }
}
