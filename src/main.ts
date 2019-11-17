// Packages
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Modules
import { AppModule } from './app.module';

// Swagger
import { initializeSwagger } from './swagger';

// Config
import { ConfigService } from './config/config.service';
import { ConfigEnum } from './config/config.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = app.get(ConfigService).get(ConfigEnum.PORT);
  await app.listen(PORT);
  console.log(`Server is listening on http://localhost:${PORT}`);
}
bootstrap();
