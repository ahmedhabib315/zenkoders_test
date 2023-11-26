import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class Signup {
  @ApiProperty({
    example: 'Jonh Doe',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Adone110#',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class Signin {
  @ApiProperty({
    example: 'johndoe@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Adone110#',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    required: false,
  })
  remember_me: boolean;
}
