import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentsModule } from './payments/payments.module';
import { PackagesModule } from './packages/packages.module';
import { NewsModule } from './news/news.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [UserModule, StripeModule, PaymentsModule, PackagesModule, NewsModule, OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
