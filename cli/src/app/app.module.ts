import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import {AppCommand} from "./app.command";
import {LoggersService} from "./logger.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product, User} from "@guitar-shop/lib/models";
import {ProductModule} from "./products/product.module";
import {UsersModule} from "./uders/users.module";

const DB_URL= 'postgresql://admin:secret@localhost:5432/guitar-shop';

@Module({
  imports: [
    ProductModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      entities: [Product, User],
    })
  ],
  providers: [AppService, AppCommand, LoggersService],
})
export class AppModule {}
