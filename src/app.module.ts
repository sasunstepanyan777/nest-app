// Packages
import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from './config/config.module';

// Controllers
import { AppController } from './app.controller';

// Providers
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
