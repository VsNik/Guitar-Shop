import { IsEnum, IsIn, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { GuitarType } from '@guitar-shop/lib/types';

const DEFAULT_PRODUCT_COUNT = 7;

export enum SortingType {
  Created = 'createdAt',
  Price = 'price',
}

export class ProductQuery {
  @IsNumber()
  @Transform(({ value } ) => +value || DEFAULT_PRODUCT_COUNT)
  @IsOptional()
  public limit = DEFAULT_PRODUCT_COUNT;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page = 1;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  @IsOptional()
  public offset: number;

  @IsEnum(SortingType)
  @IsOptional()
  public sort: SortingType = SortingType.Created;

  @IsOptional()
  public string_count: number;

  @IsEnum(GuitarType, {each: true})
  @IsOptional()
  public type: GuitarType;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public direction: 'asc' | 'desc' = 'desc';

  @IsOptional()
  public minPrice: number;

  @IsOptional()
  public maxPrice: number;
}
