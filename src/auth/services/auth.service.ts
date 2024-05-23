import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { UserService } from 'src/user/services/user.service';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpResponseDto } from '../dto/sign-up-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateToken(payload: Record<string, unknown>, secret: string) {
    return this.jwtService.signAsync(payload, { secret });
  }

  async generateAccessAndRefreshToken(payload: Record<string, unknown>) {
    const accessToken = await this.generateToken(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
    );
    const refreshToken = await this.generateToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
    );

    return { accessToken, refreshToken };
  }

  async signIn(username: string, password: string): Promise<SignInResponseDto> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const payload = { sub: user.id, username: user.username };
    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshToken(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userInfo } = user;
    return {
      ...userInfo,
      accessToken,
      refreshToken,
    };
  }

  async signUp(createAuthDto: CreateAuthDto): Promise<SignUpResponseDto> {
    const { username, password } = createAuthDto;
    const createdUser = await this.userService.create({ username, password });

    if (!createdUser) {
      throw new UnauthorizedException();
    }

    const payload = { sub: createdUser.id, username: createdUser.username };
    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshToken(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userInfo } = createdUser;
    return {
      ...userInfo,
      accessToken,
      refreshToken,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
