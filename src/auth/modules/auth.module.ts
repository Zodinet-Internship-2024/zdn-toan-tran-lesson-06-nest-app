import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/modules/user.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, JwtModule],
})
export class AuthModule {}
