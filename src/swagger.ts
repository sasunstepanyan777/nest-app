import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Nest app')
  .setDescription('The Nest app API description')
  .setVersion('1.0')
  // .addTag('cats')
  .build();

export function initializeSwagger(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}
