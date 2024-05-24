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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductResponseDto } from '../dto/create-product-response.dto';
import { GetProductResponseDto } from '../dto/get-product-response.dto';
import { GetProductsResponseDto } from '../dto/get-products-response.dto';
import { Permission } from 'src/auth/decorators/permission.decorator';
import { PERMISSIONS } from 'src/auth/constance/constances';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
@UseGuards(AuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    type: CreateProductDto,
  })
  @Post()
  @Permission(PERMISSIONS.canWriteProducts)
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({ type: GetProductsResponseDto })
  @Permission(PERMISSIONS.canReadProducts)
  @Get()
  findAll(): Promise<GetProductsResponseDto> {
    return this.productsService.findAll();
  }

  @ApiResponse({ type: GetProductResponseDto })
  @Permission(PERMISSIONS.canReadProducts)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetProductResponseDto> {
    return this.productsService.findOne(+id);
  }

  @ApiResponse({ type: GetProductResponseDto })
  @Permission(PERMISSIONS.canUpdateProducts)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<GetProductResponseDto> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Permission(PERMISSIONS.canDeleteProducts)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
