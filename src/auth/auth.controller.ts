// Packages
import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

// Providers
import { AuthService } from './auth.service';

// Dto
import { UserLoginDto } from './dto/user-login.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }
}
