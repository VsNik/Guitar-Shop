import {Injectable, NotFoundException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IProduct } from '@guitar-shop/lib/types';
import { ProductsRepository } from './products.repository';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductEntity } from './product.entity';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductQuery } from './query/product.query';
import { UploaderService } from '../uploader/uploader.service';

const PRODUCT_NOT_FOUND = "Product not found"

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly uploaderService: UploaderService,
    private readonly configService: ConfigService,
  ) {}

  async all(query: ProductQuery): Promise<[IProduct[], number]> {
    return this.productsRepository.findAll(query);    
  }

  async create(dto: ProductCreateDto, img: Express.Multer.File): Promise<IProduct> {
    const image = await this.uploaderService.upload(img);
    const productEntity = new ProductEntity({ ...dto, image });

    return this.productsRepository.save(productEntity);
  }

  async getById(id: string): Promise<IProduct> {
    const existProduct = await this.productsRepository.findById(id);

    if (!existProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return existProduct;
  }

  async updateProduct(id: string, dto: ProductUpdateDto, image: Express.Multer.File): Promise<IProduct> {
    const existProduct = await this.getById(id);

    const productEntity = new ProductEntity(existProduct);
    productEntity.update(dto);

    if (image) {
      await this.uploaderService.delete(existProduct.image);
      const img = await this.uploaderService.upload(image);
      productEntity.setImage(img);
    }
    
    return this.productsRepository.update(productEntity);
  }

  async deleteProduct(id: string): Promise<void> {
    const deletedProduct = await this.getById(id);
    await this.uploaderService.delete(deletedProduct.image);
    await this.productsRepository.delete(id);
  }

  public setStaticPath(image: string): string {
    const serverUrl = this.configService.get('SERVER_URL');
    const serveRoot = this.configService.get('SERVE_ROOT');

    return `${serverUrl}${serveRoot}/${image}`;
  }
}
