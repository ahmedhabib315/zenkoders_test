import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [StripeService, ConfigService],
})
export class StripeModule {}
