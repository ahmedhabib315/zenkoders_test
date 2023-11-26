import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, StripeService],
})
export class UserModule {}
