import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
