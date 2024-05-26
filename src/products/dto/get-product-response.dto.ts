import { ApiProperty } from '@nestjs/swagger';

export class GetProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  category: number;

  @ApiProperty()
  image: string;
}
