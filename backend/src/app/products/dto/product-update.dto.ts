import { GuitarType } from '@guitar-shop/lib/types';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class ProductUpdateDto {
  @ApiProperty({
    description: 'Product title',
    example: 'Fender'
  })
  @IsString()
  @Length(10, 100)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Guitar fender'
  })
  @IsString()
  @Length(20, 1024)
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Product photo',
  })
  image: string;

  @ApiProperty({
    description: 'Guitar type',
    example: 'acustic'
  })
  @IsEnum(GuitarType)
  @IsNotEmpty()
  type: GuitarType;

  @ApiProperty({
    description: 'Number of strings',
    example: 6
  })
  @IsNumber()
  @Transform(({value}) => +value)
  @IsIn([ 4, 6, 7, 12])
  @IsNotEmpty()
  stringCount: number;

  @ApiProperty({
    description: 'Guitar price',
    example: 30000
  })
  @IsNumber()
  @Transform(({value}) => +value)
  @Min(100)
  @Max(1000000)
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Guitar vendor code',
    example: '6tdf594d2'
  })
  @IsString()
  @Length(5, 40)
  @IsNotEmpty()
  ean: string;
}
