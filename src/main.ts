// Packages
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Modules
import { AppModule } from './app.module';

// Swagger
import { initializeSwagger } from './swagger';

// Config
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);
}
bootstrap();
