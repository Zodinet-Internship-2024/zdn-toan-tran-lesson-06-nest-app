import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { SignUpResponseDto } from '../dto/sign-up-response.dto';
import { plainToInstance } from 'class-transformer';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(payload: Record<string, unknown>) {
    const ACCESS_TOKEN_EXPIRATION = '1h';
    return this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
  }

  async generateRefreshToken(payload: Record<string, unknown>) {
    const REFRESH_TOKEN_EXPIRATION = '7d';
    return this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
  }

  async signIn(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const payload = { sub: user.id, username: user.username };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return plainToInstance(SignInResponseDto, {
      accessToken,
      refreshToken,
    });
  }

  async signUp(createAuthDto: CreateAuthDto): Promise<SignUpResponseDto> {
    const { username, password } = createAuthDto;
    const createdUser = await this.userService.create({ username, password });

    if (!createdUser) {
      throw new UnauthorizedException();
    }

    const payload = { sub: createdUser.id, username: createdUser.username };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return plainToInstance(SignUpResponseDto, {
      accessToken,
      refreshToken,
    });
  }

  async validateRefreshToken(
    refreshToken: string,
  ): Promise<Record<string, string>> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      return { userId: payload.sub, username: payload.username };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async refreshToken(refreshToken: string) {
    const validToken = await this.validateRefreshToken(refreshToken);
    if (!validToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { sub: validToken.userId, username: validToken.username };
    const newAccessToken = await this.generateAccessToken(payload);
    const newRefreshToken = await this.generateRefreshToken(payload);

    return plainToInstance(RefreshTokenResponseDto, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }
}
