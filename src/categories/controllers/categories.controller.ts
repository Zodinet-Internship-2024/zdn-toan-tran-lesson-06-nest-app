import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { GetCategoryResponseDto } from '../dto/get-category-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetCategoriesResponseDto } from '../dto/get-categories-response.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({ status: 201, type: GetCategoryResponseDto })
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<GetCategoryResponseDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiResponse({ status: 200, type: GetCategoriesResponseDto })
  @Get()
  findAll(): Promise<GetCategoriesResponseDto> {
    return this.categoriesService.findAll();
  }

  @ApiResponse({ type: GetCategoryResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetCategoryResponseDto> {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryResponseDto> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
