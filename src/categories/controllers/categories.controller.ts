import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { GetCategoryResponseDto } from '../dto/get-category-response.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCategoriesResponseDto } from '../dto/get-categories-response.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { Permission } from 'src/auth/decorators/permission.decorator';
import { PERMISSIONS } from 'src/auth/constance/constances';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
@UseGuards(AuthGuard)
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({ status: 201, type: GetCategoryResponseDto })
  @Permission(PERMISSIONS.canWriteCategories)
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<GetCategoryResponseDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiResponse({ status: 200, type: GetCategoriesResponseDto })
  @Permission(PERMISSIONS.canReadCategories)
  @Get()
  findAll(): Promise<GetCategoriesResponseDto> {
    return this.categoriesService.findAll();
  }

  @ApiResponse({ type: GetCategoryResponseDto })
  @Permission(PERMISSIONS.canReadCategories)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetCategoryResponseDto> {
    return this.categoriesService.findOne(+id);
  }
  @Permission(PERMISSIONS.canUpdateCategories)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryResponseDto> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Permission(PERMISSIONS.canDeleteCategories)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
