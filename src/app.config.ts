import { INestApplication } from '@nestjs/common';

export function setAppConfigs(app: INestApplication): void {
  app.setGlobalPrefix('/api/v1');
}
