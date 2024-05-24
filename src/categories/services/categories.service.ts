import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { GetCategoryDto } from '../dto/get-category.dto';
import { plainToInstance } from 'class-transformer';
import { GetCategoryResponseDto } from '../dto/get-category-response.dto';
import { GetCategoriesResponseDto } from '../dto/get-categories-response.dto';

@Injectable()
export class CategoriesService {
  private readonly categoriesFilePath = path.join(
    __dirname,
    '..',
    '../../src/db/categories.json',
  );

  private async readCategoriesFile(filePath: string) {
    const categories: GetCategoryDto[] = JSON.parse(
      await readFile(filePath, 'utf8'),
    );

    return categories;
  }

  private async writeProductsFile(
    filePath: string,
    newCategories: GetCategoryDto[],
  ) {
    await writeFile(filePath, JSON.stringify(newCategories));
  }

  private generateId(categories: GetCategoryDto[]) {
    const { id } = categories[categories.length - 1];
    const newId = id + 1;
    return newId;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const categories: GetCategoryDto[] = await this.readCategoriesFile(
        this.categoriesFilePath,
      );

      const newCategory: GetCategoryDto = {
        ...createCategoryDto,
        id: this.generateId(categories),
      };

      const newProducts = [...categories, newCategory];
      await this.writeProductsFile(this.categoriesFilePath, newProducts);

      return plainToInstance(GetCategoryResponseDto, newCategory);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const categories = await this.readCategoriesFile(this.categoriesFilePath);
      return plainToInstance(GetCategoriesResponseDto, { categories });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const categories: GetCategoryDto[] = await this.readCategoriesFile(
        this.categoriesFilePath,
      );

      if (!categories) {
        throw new InternalServerErrorException();
      }

      const findCategory = categories.find((category) => category.id === id);

      if (!findCategory) {
        throw new NotFoundException();
      }

      return plainToInstance(GetCategoryResponseDto, findCategory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categories: GetCategoryDto[] = await this.readCategoriesFile(
        this.categoriesFilePath,
      );

      const findIndex = categories.findIndex((category) => category.id === id);

      if (findIndex < 0) {
        throw new NotFoundException();
      }

      categories[findIndex] = {
        ...categories[findIndex],
        ...updateCategoryDto,
      };

      await this.writeProductsFile(this.categoriesFilePath, categories);

      return plainToInstance(GetCategoryResponseDto, categories[findIndex]);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const categories: GetCategoryDto[] = await this.readCategoriesFile(
        this.categoriesFilePath,
      );

      const findIndex = categories.findIndex((product) => product.id === id);
      console.log(categories);
      if (findIndex < 0) {
        throw new NotFoundException();
      }

      categories.splice(findIndex, 1);

      await this.writeProductsFile(this.categoriesFilePath, categories);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
