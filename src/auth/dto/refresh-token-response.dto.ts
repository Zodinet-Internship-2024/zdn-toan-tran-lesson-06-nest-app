import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RefreshTokenResponseDto {
  @ApiProperty()
  @Expose()
  refreshToken: string;

  @ApiProperty()
  @Expose()
  accessToken: string;
}
