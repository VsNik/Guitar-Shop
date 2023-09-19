import { GuitarType, IProduct } from '@guitar-shop/lib/types';

export class ProductEntity {
  id: string;
  title: string;
  description: string;
  image: string;
  type: GuitarType;
  stringCount: number;
  price: number;
  ean: string;
  createdAt: string;

  constructor(entity: Partial<IProduct>) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.image = entity.image;
    this.type = entity.type;
    this.stringCount = entity.stringCount;
    this.price = entity.price;
    this.ean = entity.ean;
    this.createdAt = entity.createdAt ?? new Date().toISOString();
  }

  public update(item: Partial<IProduct>) {
    this.title = item.title;
    this.description = item.description;
    this.price = item.price;
    this.type = item.type;
    this.stringCount = item.stringCount;
    this.ean = item.ean
    this.createdAt = new Date().toISOString();
  }

  public setImage(image: string): void {
    this.image = image;
  }

  toObject(): IProduct {
    return {...this}
  }
}
