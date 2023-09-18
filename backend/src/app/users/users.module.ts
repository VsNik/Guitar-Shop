import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJWTConfig } from '../configs/jwt.config';
import { User } from './models/user.model';
import { UsersRepository } from './users.repository';
import { MailModule } from '../mail/mail.module';

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
