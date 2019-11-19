// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

// Controllers
import { AttachmentsController } from './attachments.controller';

// Providers
import { AttachmentsService } from './attachments.service';
import { MulterConfigService } from '../config/multer-config.service';

// Entities
import { AttachmentEntity } from './entities/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttachmentEntity]),
    MulterModule.registerAsync({
      useExisting: MulterConfigService
    }),
  ],
  controllers: [
    AttachmentsController
  ],
  providers: [
    AttachmentsService
  ],
  exports: [
    MulterModule,
    AttachmentsService
  ]
})
export class AttachmentsModule {}
