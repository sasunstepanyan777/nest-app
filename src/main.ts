import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeSwagger } from './swagger';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwagger(app);

  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);
}
bootstrap();
