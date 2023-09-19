import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { getMailConfig } from '../configs/mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig()),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
