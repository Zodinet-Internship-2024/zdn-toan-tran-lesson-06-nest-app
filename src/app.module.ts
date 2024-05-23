import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/modules/products.module';
import { CategoriesModule } from './categories/modules/categories.module';
import { AuthModule } from './auth/modules/auth.module';
import { UserModule } from './user/modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    AuthModule,
    UserModule,
    JwtModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
