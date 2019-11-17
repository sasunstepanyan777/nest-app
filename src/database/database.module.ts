// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Providers
import { DatabaseConfigService } from '../config/database-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useExisting: DatabaseConfigService,
    }),
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
