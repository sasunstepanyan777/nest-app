// Packages
import { Module } from '@nestjs/common';

// Providers
import { ConfigService } from './config.service';
import { DatabaseConfigService } from './database-config.service';

@Module({
  providers: [
    DatabaseConfigService,
    {
      provide: ConfigService,
      useFactory: (): ConfigService => {
        const env = process.env.NODE_ENV || 'development';
        return new ConfigService(`${env}.env`);
      }
    },
  ],
  exports: [ConfigService, DatabaseConfigService],
})
export class ConfigModule {}
