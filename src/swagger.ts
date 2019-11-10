import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Nest app')
  .setDescription('The Nest app API description')
  .setVersion('1.0')
  .addTag('users')
  .addTag('auth')
  .addBearerAuth()
  .build();

export function initializeSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1', app, document);
}
