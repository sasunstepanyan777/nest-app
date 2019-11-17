// Packages
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

// Modules
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// Providers
import { MulterConfigService } from './config/multer-config.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
