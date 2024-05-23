import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 30)
  title: string;

  description: string;

  @IsPositive()
  price: number;

  @IsPositive()
  @IsOptional()
  discount: number;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;
}
