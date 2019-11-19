import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';

export const httpsOptions: HttpsOptions = {
  key: readFileSync('./keys/key.pem'),
  cert: readFileSync('./keys/cert.pem'),
  passphrase: 'nest-app'
};
