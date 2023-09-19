import {GuitarType} from "@guitar-shop/lib/types";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class ProductRdo {
  @ApiProperty({
    description: 'Unique product ID',
    example: '8a412fb7-e8ad-4ab6-bb2f-25620bba6cab'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Fender'
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Guitar fender'
  })
  @Expose()
  description: string

  @ApiProperty({
    description: 'Product photo',
  })
  @Expose()
  image: string;

  @ApiProperty({
    description: 'Guitar type',
    example: 'acustic'
  })
  @Expose()
  type: GuitarType

  @ApiProperty({
    description: 'Number of strings',
    example: 6
  })
  @Expose()
  stringCount: number

  @ApiProperty({
    description: 'Guitar price',
    example: 30000
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Product vendor code',
    example: '6tdf594d2'
  })
  @Expose()
  ean: string;

  @ApiProperty({
    description: 'Publish date',
    example: '20-12-2012 00:00:00'
  })
  @Expose()
  createdAt: string;
}
