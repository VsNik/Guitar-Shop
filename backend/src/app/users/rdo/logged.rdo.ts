import { Expose } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class LoggedRdo {
  @ApiProperty({
    description: 'Auth token',
    example: 'auth-token'
  })
  @Expose()
  token: string;
}
