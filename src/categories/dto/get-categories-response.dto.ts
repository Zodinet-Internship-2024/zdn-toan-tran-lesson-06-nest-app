import { Expose, Type } from 'class-transformer';
import { GetCategoryResponseDto } from './get-category-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetCategoriesResponseDto {
  @Type(() => GetCategoryResponseDto)
  @Expose()
  @ApiProperty({ type: [GetCategoryResponseDto] })
  categories: GetCategoryResponseDto[];
}
