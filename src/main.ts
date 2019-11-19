// Packages
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer as createServerHttp } from 'http';
import { createServer as createServerHttps } from 'https';

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
import { setAppConfigs } from './app.config';
import { httpsOptions } from './https.options';

async function bootstrap() {

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  // const app = await NestFactory.create(AppModule, {
  //   // httpsOptions
  // });

  setAppConfigs(app);

  initSecurity(app);

  initializeSwagger(app);

  usePipes(app);

  await app.init();

  const PORT = app.get(ConfigService).get(ConfigEnum.PORT);
  // await app.listen(PORT);
  // console.log(`Server is listening on http://localhost:${PORT}`);

  createServerHttp(server).listen(PORT);
  createServerHttps(httpsOptions, server).listen(443);
}

bootstrap();
