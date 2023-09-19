import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductQuery } from './query/product.query';
import { plainToInstance } from 'class-transformer';
import { fillObject } from '@guitar-shop/lib/utils';
import { ProductRdo } from './rdo/product.rdo';
import { ProductListRdo } from './rdo/product-list.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from "multer";
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../users/auth/auth.guard";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @ApiResponse({
    type: ProductListRdo,
    status: HttpStatus.OK,
    description: 'Products list'
  })
  @Get()
  async all(@Query() query: ProductQuery) {
    const productQuery = plainToInstance(ProductQuery, query);
    const [data, count] = await this.productsService.all(productQuery);

    const products = data.map((item) => {
      const productImage = this.productsService.setStaticPath(item.image);
      return fillObject(ProductRdo, { ...item, image: productImage });
    })

    const result = {
      data: products,
      page: productQuery.page,
      limit: productQuery.limit,
      total: count,
    }

    return fillObject(ProductListRdo, result);
  }

  @ApiResponse({
    type: ProductRdo,
    status: HttpStatus.CREATED,
    description: 'Product has been successfully created'
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() dto: ProductCreateDto, @UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({fileType: '.(png|jpeg|jpg)'})],
      fileIsRequired: true,
    })
  ) image: Express.Multer.File) {
    const newProduct = await this.productsService.create(dto, image);
    const productImage = this.productsService.setStaticPath(newProduct.image);
    return fillObject(ProductRdo, {...newProduct, image: productImage});
  }

  @ApiResponse({
    type: ProductRdo,
    status: HttpStatus.OK,
    description: 'Product detail info'
  })
  @Get(':id')
  async show(@Param('id') id: string) {
    const product = await this.productsService.getById(id);
    const productImage = this.productsService.setStaticPath(product.image);
    return fillObject(ProductRdo, {...product, image: productImage});
  }

  @ApiResponse({
    type: ProductRdo,
    status: HttpStatus.OK,
    description: 'Product has been successfully updated'
  })
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() dto: ProductUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({fileType: '.(png|jpeg|jpg)'})],
        fileIsRequired: false,
      })
    ) image: Express.Multer.File
  ) {
    const updatedProduct = await this.productsService.updateProduct(id, dto, image);
    const productImage = this.productsService.setStaticPath(updatedProduct.image);
    return fillObject(ProductRdo, {...updatedProduct, image: productImage});
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product has been successfully deleted'
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.productsService.deleteProduct(id);
  }
}
