import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export enum Mail {
  Subject = 'Регистрация на Guitar Shop',
  Template = './notify',
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async send(name: string, email: string, password: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: Mail.Subject,
      template: Mail.Template,
      context: {
        link: this.getLink(),
        name,
        email,
        password
      }
    });
  }

  private getLink() {
    const clientUrl = this.configService.get('CLIENT_URL');
    return `${clientUrl}/login`;
  }
}
