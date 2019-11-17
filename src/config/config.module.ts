// Packages
import { Module } from '@nestjs/common';

// Providers
import { ConfigService } from './config.service';
import { DatabaseConfigService } from './database-config.service';
import { JWTConfigService } from './jwt-config.service';

@Module({
  providers: [
    DatabaseConfigService,
    JWTConfigService,
    {
      provide: ConfigService,
      useFactory: (): ConfigService => {
        const env = process.env.NODE_ENV || 'development';
        return new ConfigService(`${env}.env`);
      }
    }
  ],
  exports: [ConfigService, DatabaseConfigService, JWTConfigService],
})
export class ConfigModule {}
