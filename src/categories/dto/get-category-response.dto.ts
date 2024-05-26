import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
