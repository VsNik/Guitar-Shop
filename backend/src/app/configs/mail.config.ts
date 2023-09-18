import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'node:path';

export const getMailConfig = (): MailerAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    transport: {
      host: configService.get('MAIL_SMTP_HOST'),
      port: configService.get('MAIL_SMTP_PORT'),
      secure: false,
      auth: {
        user: configService.get('MAIL_USER_NAME'),
        pass: configService.get('MAIL_USER_PASSWORD')
      },
    },
    defaults: {
      from: configService.get('MAIL_FROM')
    },
    template: {
      dir: path.resolve(__dirname, 'assets'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true
      }
    }
  })
})
