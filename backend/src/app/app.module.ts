import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { validate } from './env.validation';
import { getORMConfig } from './configs/orm.config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { AuthMiddleware } from './users/auth/auth.middleware';
import { ProductsModule } from './products/products.module';
import { Product } from './products/models/product.model';
import { UploaderModule } from './uploader/uploader.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { getServeConfig } from './configs/serveConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    TypeOrmModule.forRootAsync(getORMConfig(User, Product)),
    ServeStaticModule.forRootAsync(getServeConfig()),
    UsersModule,
    ProductsModule,
    UploaderModule,
  ],
  controllers: [AppController],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
