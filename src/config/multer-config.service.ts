// Packages
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

export class MulterConfigService implements MulterOptionsFactory  {

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: '/upload'
    };
  }
}
