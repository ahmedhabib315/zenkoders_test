import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { StripeService } from 'src/stripe/stripe.service';
import { PrismaService } from '@libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService, PrismaService, JwtService],
})
export class PaymentsModule {}
