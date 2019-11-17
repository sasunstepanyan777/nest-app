// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Providers
import { AttachmentsService } from './attachments.service';

// Entities
import { AttachmentEntity } from './entities/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttachmentEntity])
  ],
  providers: [
    AttachmentsService
  ],
  exports: [
    AttachmentsService
  ]
})
export class AttachmentsModule {}
