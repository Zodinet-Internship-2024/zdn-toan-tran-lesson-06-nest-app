import { Module } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CategoriesController } from '../controllers/categories.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/modules/user.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [JwtModule, UserModule],
})
export class CategoriesModule {}
