// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { AttachmentsModule } from '../attachments/attachments.module';

// Providers
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

// Entities
import { UserEntity } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../config/multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AttachmentsModule,
    MulterModule.registerAsync({
      useExisting: MulterConfigService
    }),
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
