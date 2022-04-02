import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

const stripeProvider = {
  provide: 'STRIPE',
  useFactory(configService: ConfigService) {
    return new Stripe(configService.get('stripe_secret_key'), {
      apiVersion: '2020-08-27',
    });
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [stripeProvider],
  exports: [stripeProvider],
})
export class StripeModule {}
