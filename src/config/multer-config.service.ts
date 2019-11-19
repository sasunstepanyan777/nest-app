// Packages
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Request } from 'express';

// Models
import { IUploadedFile } from 'src/attachments/models/uploaded-file.model';

export class MulterConfigService implements MulterOptionsFactory  {

  createMulterOptions(): MulterModuleOptions {
    return {
      fileFilter: (req: Request, file: IUploadedFile, callback: (error: Error | null, acceptFile: boolean) => void) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: './attachments',
        filename: (req: Request, file: IUploadedFile, callback: (error: Error | null, filename: string) => void) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          return callback(null, `${randomName}${extname(file.originalname).toLowerCase()}`);
        }
      })
    };
  }
}
