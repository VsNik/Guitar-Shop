import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {
  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.test'
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password'
  })
  @IsNotEmpty()
  readonly password: string;
}
