// Packages
import { Module } from '@nestjs/common';

// Modules
import { JWTModule } from './jwt.module';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '../config/config.module';

// Providers
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JWTModule
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {}
