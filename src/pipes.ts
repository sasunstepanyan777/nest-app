// Packages
import { INestApplication, ValidationPipe } from '@nestjs/common';

export function usePipes(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
}
