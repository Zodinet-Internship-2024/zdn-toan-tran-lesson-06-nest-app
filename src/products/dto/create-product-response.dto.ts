import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateProductResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  discount: number;

  @ApiProperty()
  @Expose()
  category: number;

  @ApiProperty()
  @Expose()
  image: string;
}
