import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetCategoryResponseDto } from './get-category-response.dto';

export class GetCategoriesResponseDto {
  @ApiProperty({ type: [GetCategoryResponseDto] })
  categories: GetCategoryResponseDto[];
}
