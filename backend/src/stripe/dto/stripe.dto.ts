import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCustomer {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

export class AddCard {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  customer_id: string;
}

export class RemoveCard {
  @IsNotEmpty()
  @IsString()
  card_id: string;

  @IsNotEmpty()
  @IsString()
  customer_id: string;
}

export class CreateSubscription {
  @IsNotEmpty()
  @IsString()
  price_id: string;

  @IsNotEmpty()
  @IsString()
  customer_id: string;
}

export class UpdateSubscription {
  @IsNotEmpty()
  @IsString()
  subscription_id: string;
}

export class Product {
  @IsNotEmpty()
  @IsString()
  product_id: string;
}
