import {Module} from "@nestjs/common";
import {ProductCommand} from "./product.command";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "@guitar-shop/lib/models";
import {ProductsService} from "./products.service";
import {UsersModule} from "../uders/users.module";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [
    ProductCommand,
    ProductsService,
  ]
})
export class ProductModule {}
