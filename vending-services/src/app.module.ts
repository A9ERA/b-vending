import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CashModule } from './modules/cash/cash.module';
import { CategoryModule } from './modules/category/category.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { MediaModule } from './modules/media/media.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductModule } from './modules/product/product.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { TypeOrmConfigService } from './database/database.config';

@Module({
  imports: [
    CashModule,
    CategoryModule,
    InventoryModule,
    MediaModule,
    PaymentModule,
    ProductModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
