import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthService } from '../services/auth.service';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { SignUpResponseDto } from '../dto/sign-up-response.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';

@ApiCookieAuth()
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('sign-in')
  @ApiResponse({ status: 200, type: SignInResponseDto })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('sign-up')
  @ApiResponse({ status: 201, type: SignUpResponseDto })
  signUp(@Body() createAuthDto: CreateAuthDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(createAuthDto);
  }

  @Post('refresh')
  @ApiResponse({ status: 200, type: RefreshTokenResponseDto })
  refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
