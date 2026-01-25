import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
// Eita banay niben
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/auth.register-dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { LoginDto } from './dto/auth.login-dto';

@ApiTags('Authentication') // Swagger-e grouping-er jonno
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered. Please check email for OTP.',
  })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify email using OTP' })
  @ApiResponse({ status: 200, description: 'Email verified successfully.' })
  async verify(@Body() verifyAuthDto: VerifyAuthDto) {
    return await this.authService.verifyUser(verifyAuthDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns JWT token.',
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
