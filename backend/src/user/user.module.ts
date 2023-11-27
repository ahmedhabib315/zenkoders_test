import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '@libs/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { StripeService } from 'src/stripe/stripe.service';
import { AtStrategy, RtStrategy } from '@libs/strategies';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    JwtService,
    StripeService,
    AtStrategy,
    RtStrategy,
  ],
})
export class UserModule {}
