// Packages
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { join } from 'path';

export class MulterConfigService implements MulterOptionsFactory  {

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: join(process.cwd(), 'upload')
    };
  }
}
