// Packages
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

// Providers
import { ConfigService } from './config.service';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {

  constructor(private readonly configService: ConfigService) { }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DATABASE_HOST') as string,
      port: this.configService.get('DATABASE_PORT') as number,
      username: this.configService.get('DATABASE_USERNAME') as string,
      password: this.configService.get('DATABASE_PASSWORD') as string,
      database: this.configService.get('DATABASE_NAME') as string,
      entities: [__dirname, '**/*.entity.js'],
      synchronize: true,
    };
  }
}
