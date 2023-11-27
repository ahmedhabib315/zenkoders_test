import {
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OpenAISummary {
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    required: true,
  })
  @IsString()
  description: string;

}
