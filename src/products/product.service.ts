import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly productsFilePath = path.join(
    __dirname,
    '..',
    '../src/db/products.json',
  );

  private async readProductsFile(filePath: string) {
    const products: GetProductDto[] = JSON.parse(
      await readFile(filePath, 'utf8'),
    );

    return products;
  }

  private async writeProductsFile(
    filePath: string,
    newProducts: GetProductDto[],
  ) {
    await writeFile(filePath, JSON.stringify(newProducts));
  }

  private generateId(products: GetProductDto[]) {
    const { id } = products[products.length - 1];
    const newId = id + 1;
    return newId;
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const products: GetProductDto[] = await this.readProductsFile(
        this.productsFilePath,
      );

      const newProduct: GetProductDto = {
        ...createProductDto,
        id: this.generateId(products),
      };

      const newProducts = [...products, newProduct];
      await this.writeProductsFile(this.productsFilePath, newProducts);

      return newProduct;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const products = await this.readProductsFile(this.productsFilePath);
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const products: GetProductDto[] = await this.readProductsFile(
        this.productsFilePath,
      );

      if (!products) {
        throw new InternalServerErrorException();
      }

      const findProduct = products.find((product) => product.id === id);

      if (!findProduct) {
        throw new NotFoundException();
      }

      return findProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const products: GetProductDto[] = await this.readProductsFile(
        this.productsFilePath,
      );

      const findIndex = products.findIndex((product) => product.id === id);

      if (findIndex < 0) {
        throw new NotFoundException();
      }

      products[findIndex] = {
        ...products[findIndex],
        ...updateProductDto,
      };

      await this.writeProductsFile(this.productsFilePath, products);

      return products[findIndex];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const products: GetProductDto[] = await this.readProductsFile(
        this.productsFilePath,
      );

      const findIndex = products.findIndex((product) => product.id === id);
      console.log(products);
      if (findIndex < 0) {
        throw new NotFoundException();
      }

      const deletedProduct = products.splice(findIndex, 1);

      await this.writeProductsFile(this.productsFilePath, products);

      return deletedProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
