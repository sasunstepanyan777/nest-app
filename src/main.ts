// Packages
import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from './app.module';

// Swagger
import { initializeSwagger } from './swagger';

// Pipes
import { usePipes } from './pipes';

// Security
import { initSecurity } from './security';

// Config
import { ConfigService } from './config/config.service';
import { ConfigEnum } from './config/config.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSecurity(app);

  initializeSwagger(app);

  usePipes(app);

  const PORT = app.get(ConfigService).get(ConfigEnum.PORT);
  await app.listen(PORT);
  console.log(`Server is listening on http://localhost:${PORT}`);
}

bootstrap();
