import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @Length(3, 30)
  name: string;

  @ApiProperty()
  description: string;
}
