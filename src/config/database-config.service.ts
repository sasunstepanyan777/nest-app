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
      host: this.configService.get(ConfigEnum.DATABASE_HOST),
      port: this.configService.get(ConfigEnum.DATABASE_PORT),
      username: this.configService.get(ConfigEnum.DATABASE_USERNAME),
      password: this.configService.get(ConfigEnum.DATABASE_PASSWORD),
      database: this.configService.get(ConfigEnum.DATABASE_NAME),
      entities: [process.cwd(), '**/*.entity.{js, ts}'],
      synchronize: true,
    };
  }
}
