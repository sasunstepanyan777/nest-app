// Packages
import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiCreatedResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

// Providers
import { AuthService } from './auth.service';

// Dto
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisteredDto } from './dto/registered.dto';
import { LoginedDto } from './dto/logined.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'Signed up', type: RegisteredDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  addUser(@Body() body: CreateUserDto): Promise<RegisteredDto> {
    return this.authService.signup(body);
  }

  @ApiCreatedResponse({ description: 'Signed in', type: LoginedDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('login')
  public async login(@Body() body: UserLoginDto): Promise<LoginedDto> {
    return this.authService.login(body);
  }
}
