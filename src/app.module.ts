// Packages
import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from './config/config.module';
import { TypeORMModule } from './typeorm.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    TypeORMModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
