import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetCategoryResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;
}
