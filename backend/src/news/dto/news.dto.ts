import {
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class News {
  @ApiProperty({
    example: 'general',
  })
  @IsString()
  @IsOptional()
  category: string;

  @ApiProperty({
    example: 'test',
  })
  @IsString()
  @IsOptional()
  q: string;

}
