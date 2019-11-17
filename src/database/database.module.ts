// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { ConfigModule } from '../config/config.module';

// Providers
import { DatabaseConfigService } from '../config/database-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DatabaseConfigService,
    }),
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
