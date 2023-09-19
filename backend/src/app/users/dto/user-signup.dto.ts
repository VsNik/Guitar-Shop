import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserSignupDto {
  @ApiProperty({
    description: 'User name',
    example: 'user'
  })
  @IsString()
  @Length(1, 15)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'User unique Email address',
    example: 'user@app.test'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password'
  })
  @IsString()
  @Length(6, 12)
  readonly password: string;
}
