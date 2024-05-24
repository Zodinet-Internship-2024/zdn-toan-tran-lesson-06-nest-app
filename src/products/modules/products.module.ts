import { Module } from '@nestjs/common';
import { ProductsService } from '../services/product.service';
import { ProductsController } from '../controllers/products.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/modules/user.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [JwtModule, UserModule],
})
export class ProductsModule {}
