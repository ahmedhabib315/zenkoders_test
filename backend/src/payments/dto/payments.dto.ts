import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Token {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'stripe token',
    required: true,
  })
  token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'ABC',
    required: true,
  })
  package_name: string;
}
