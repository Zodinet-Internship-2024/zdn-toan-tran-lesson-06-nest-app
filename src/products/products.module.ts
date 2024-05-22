import { Module } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
