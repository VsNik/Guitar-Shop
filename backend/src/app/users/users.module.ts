import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJWTConfig } from '../configs/jwt.config';
import { UsersRepository } from './users.repository';
import { MailModule } from '../mail/mail.module';
import {User} from "@guitar-shop/lib/models";

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.registerAsync(getJWTConfig()),
    MailModule,
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
