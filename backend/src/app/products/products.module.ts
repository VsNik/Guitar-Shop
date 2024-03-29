import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import {UploaderModule} from "../uploader/uploader.module";
import {Product} from "@guitar-shop/lib/models";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UploaderModule,
  ],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
