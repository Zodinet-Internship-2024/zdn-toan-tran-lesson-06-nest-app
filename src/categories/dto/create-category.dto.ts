import { Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(3, 30)
  name: string;
  description: string;
}
