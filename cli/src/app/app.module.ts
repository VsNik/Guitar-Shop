import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import {AppCommand} from "./app.command";
import {LoggersService} from "./logger.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product, User} from "@guitar-shop/lib/models";
import {ProductModule} from "./products/product.module";
import {UsersModule} from "./uders/users.module";

@Module({
  imports: [
    ProductModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://admin:secret@localhost:5432/guitar-shop',
      entities: [Product, User],
    })
  ],
  providers: [AppService, AppCommand, LoggersService],
})
export class AppModule {}
