import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsService } from '../services/product.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { ApiResponse } from '@nestjs/swagger';
import { CreateProductResponseDto } from '../dto/create-product-response.dto';
import { GetProductResponseDto } from '../dto/get-product-response.dto';
import { GetProductsResponseDto } from '../dto/get-products-response.dto';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    type: CreateProductDto,
  })
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    return this.productsService.create(createProductDto);
  }

  // @UseGuards(AuthGuard)
  // @UseGuards(PermissionGuard)

  @ApiResponse({ type: GetProductsResponseDto })
  @Get()
  findAll(): Promise<GetProductsResponseDto> {
    return this.productsService.findAll();
  }

  @ApiResponse({ type: GetProductResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetProductResponseDto> {
    return this.productsService.findOne(+id);
  }

  @ApiResponse({ type: GetProductResponseDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<GetProductResponseDto> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
