import {ProductRdo} from "./product.rdo";
import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class ProductListRdo {

  @Expose()
  data: ProductRdo[];

  @ApiProperty({
    description: 'Number of page',
    example: 1
  })
  @Expose()
  page: number;

  @ApiProperty({
    description: 'Count products on page',
    example: 7
  })
  @Expose()
  limit: number;

  @ApiProperty({
    description: 'Total products count',
    example: 10
  })
  @Expose()
  total: number;
}
