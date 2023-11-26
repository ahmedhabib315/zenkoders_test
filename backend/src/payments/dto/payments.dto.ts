import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Token {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  package_name: string;
}
