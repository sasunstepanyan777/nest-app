// Packages
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Config
import { ConfigService } from './config.service';
import { ConfigEnum } from './config.enum';

@Injectable()
export class JWTConfigService implements JwtOptionsFactory {

  constructor(
    private readonly configService: ConfigService
  ) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      publicKey: this.extractKey('public'),
      privateKey: this.extractKey('private'),
      signOptions: {
        algorithm: this.configService.get(ConfigEnum.JWT_SIGN_ALGORITHM) as string,
        expiresIn: this.configService.get(ConfigEnum.JWT_EXPIRE),
      }
    };
  }

  public extractKey(key: 'public' | 'private'): string {
    try {
      return readFileSync(resolve(process.cwd(), 'keys', `${key}.pem`), 'utf-8');
    } catch (err) {
      console.log(err);
      return '';
    }
  }
}
