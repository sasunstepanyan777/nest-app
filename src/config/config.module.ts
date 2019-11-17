// Packages
import { Module, Global } from '@nestjs/common';

// Providers
import { ConfigService } from './config.service';
import { DatabaseConfigService } from './database-config.service';
import { JWTConfigService } from './jwt-config.service';
import { MulterConfigService } from './multer-config.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useFactory: (): ConfigService => {
        const env = process.env.NODE_ENV || 'development';
        return new ConfigService(`${env}.env`);
      }
    },
    DatabaseConfigService,
    JWTConfigService,
    MulterConfigService
  ],
  exports: [ConfigService, DatabaseConfigService, JWTConfigService, MulterConfigService],
})
export class ConfigModule {}
