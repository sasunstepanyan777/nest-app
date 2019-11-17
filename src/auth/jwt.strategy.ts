// Packages
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Providers
import { AuthService } from './auth.service';
import { JWTConfigService } from '../config/jwt-config.service';

// Models
import { TokenPayloadModel } from './models/token-payload.model';
import { IUser } from '../users/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtConfigService: JWTConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.extractKey('public')
    });
  }

  public async validate(payload: TokenPayloadModel): Promise<IUser> {
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
