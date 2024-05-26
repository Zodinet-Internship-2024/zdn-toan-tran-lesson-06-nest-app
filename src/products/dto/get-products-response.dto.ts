import { ApiProperty } from '@nestjs/swagger';
import { GetProductResponseDto } from './get-product-response.dto';

export class GetProductsResponseDto {
  @ApiProperty({ type: [GetProductResponseDto] })
  products: GetProductResponseDto[];
}
