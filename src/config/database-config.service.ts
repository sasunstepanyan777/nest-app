// Packages
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

// Providers
import { ConfigService } from './config.service';

// Config
import { ConfigEnum } from './config.enum';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {

  constructor(private readonly configService: ConfigService) { }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get(ConfigEnum.DATABASE_HOST) as string,
      port: this.configService.get(ConfigEnum.DATABASE_PORT) as number,
      username: this.configService.get(ConfigEnum.DATABASE_USERNAME) as string,
      password: this.configService.get(ConfigEnum.DATABASE_PASSWORD) as string,
      database: this.configService.get(ConfigEnum.DATABASE_NAME) as string,
      entities: [process.cwd(), '**/*.entity.{js, ts}'],
      synchronize: true,
    };
  }
}
