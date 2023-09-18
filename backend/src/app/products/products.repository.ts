import { Injectable } from '@nestjs/common';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProduct } from '@guitar-shop/lib/types';
import { Product } from './models/product.model';
import { ProductEntity } from './product.entity';
import { ProductQuery } from './query/product.query';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
  ) {}

  public async save(item: ProductEntity): Promise<IProduct> {
    return this.productsRepository.save(item);
  }

  public async findById(id: string): Promise<IProduct> {
    return this.productsRepository.findOneBy({ id });
  }

  public async findAll(query: ProductQuery): Promise<[Product[], number]> {
    const { limit, page, sort, direction, type, string_count, minPrice, maxPrice } = query;

    const qb = this.productsRepository.createQueryBuilder('product')
      .select('product');

    if (type) {
      if (Array.isArray(type)) {
        qb.andWhere('product.type IN (:...type)', {type});
      } else {
        qb.andWhere('product.type = :type', {type});
      }
    }

    if (string_count) {
      
      if (Array.isArray(string_count)) {
        qb.andWhere('product.stringCount IN (:...string_count)', {string_count});
      } else {
        qb.andWhere('product.stringCount = :string_count', {string_count});
      }
    }

    if (minPrice) {
      qb.andWhere('product.price > :minPrice', {minPrice})
    }

    if (maxPrice) {
      qb.andWhere('product.price <= :maxPrice', {maxPrice})
    }

    qb.orderBy(`product.${sort}`, direction === 'asc' ? 'ASC' : "DESC");
    qb.limit(limit);
    qb.offset(limit * (page - 1))

    const count = await qb.getCount();
    const products = await qb.getMany();

    return [products, count]
  }

  public async update(product: IProduct): Promise<IProduct> {
    const { id, ...toUpdate } = product;
    await this.productsRepository.update({ id }, toUpdate);
    return this.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.productsRepository.delete(id);
    return !!result;
  }

}
