// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

// Modules
import { AttachmentsModule } from '../attachments/attachments.module';

// Providers
import { UsersService } from './users.service';
import { MulterConfigService } from '../config/multer-config.service';

// Controllers
import { UsersController } from './users.controller';

// Entities
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.registerAsync({
      useExisting: MulterConfigService
    }),
    AttachmentsModule
  ],
  providers: [
    UsersService
  ],
  controllers: [
    UsersController
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
