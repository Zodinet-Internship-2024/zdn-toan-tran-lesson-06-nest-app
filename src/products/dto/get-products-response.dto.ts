import { Expose, Type } from 'class-transformer';
import { GetProductResponseDto } from './get-product-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductsResponseDto {
  @Type(() => GetProductResponseDto)
  @Expose()
  @ApiProperty({ type: [GetProductResponseDto] })
  products: GetProductResponseDto[];
}
