import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsPositive()
  @IsOptional()
  discount: number;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  category: number;
}
