import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { GetUserDto } from '../dto/get-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly userFilePath = path.join(
    __dirname,
    '..',
    '../../src/db/users.json',
  );

  private async readUsersFile(filePath: string) {
    const users: GetUserDto[] = JSON.parse(await readFile(filePath, 'utf8'));

    return users;
  }

  private async writeUsersFile(filePath: string, newProducts: GetUserDto[]) {
    await writeFile(filePath, JSON.stringify(newProducts));
  }

  private generateId(users: GetUserDto[]) {
    if (users.length === 0) {
      return 1;
    }

    const { id } = users[users.length - 1];
    const newId = id + 1;
    return newId;
  }

  async findByUsername(username: string) {
    const users = await this.readUsersFile(this.userFilePath);
    return users.find((user) => user.username === username);
  }

  async create(createUserDto: CreateUserDto) {
    const users = await this.readUsersFile(this.userFilePath);
    const findUser = users.find(
      (user) => user.username === createUserDto.username,
    );

    if (findUser) {
      throw new ConflictException('Username already exists');
    }

    console.log(process.env.HASH_SALT);
    const salt = Number(process.env.HASH_SALT) || 10;
    const newId = this.generateId(users);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const USER_ROLE_ID = 1;
    const newUser: GetUserDto = {
      id: newId,
      username: createUserDto.username,
      password: hashedPassword,
      roleId: USER_ROLE_ID,
    };

    users.push(newUser);

    await this.writeUsersFile(this.userFilePath, users);
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
