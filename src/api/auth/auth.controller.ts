import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Post('signup')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post('signin')
  async login(@Body() user: LoginDto) {
    const vo = await this.authService.login(user);

    // 生成token
    const accessToken = this.jwtService.sign({
      userId: vo.user.id,
      username: vo.user.username
    }, {
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    })

    const refreshToken = this.jwtService.sign({
      userId: vo.user.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    });

    const data = {
      accessToken,
      refreshToken,
      user: vo.user
    }

    return data;
  }
}
