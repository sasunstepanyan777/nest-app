import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwagger(app);

  await app.listen(3000);
}
bootstrap();
