import { Expose } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '8a412fb7-e8ad-4ab6-bb2f-25620bba6cab'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'User'
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'User Email address',
    example: 'user@app.test'
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User register date',
    example: '20-12-2012 00:00:00'
  })
  @Expose()
  createdAt: string;
}
