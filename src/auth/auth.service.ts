// Packages
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Providers
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async login(userData: any) {
    const user = await this.usersService.findByEmail(userData.email);
    if (user && user.password === userData.pass) {
      const payload = { email: user.email, id: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
