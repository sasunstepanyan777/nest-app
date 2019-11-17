// Packages
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Modules
import { ConfigModule } from '../config/config.module';

// Providers
import { JWTConfigService } from '../config/jwt-config.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useExisting: JWTConfigService
    })
  ],
  exports: [
    JwtModule
  ]
})
export class JWTModule {}
