// Packages
import { INestApplication } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as helmet from 'helmet';

export function initSecurity(app: INestApplication): void {
  // Set rate limit
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));

  // Enable CORS
  const corsOptions: CorsOptions = {
    // origin: ['http://localhost:8080'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.enableCors(corsOptions);

  // Use Helmet
  app.use(helmet());
}
