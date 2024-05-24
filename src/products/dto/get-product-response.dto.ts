import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetProductResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  discount: number;

  @Expose()
  @ApiProperty()
  category: number;

  @Expose()
  @ApiProperty()
  image: string;
}
