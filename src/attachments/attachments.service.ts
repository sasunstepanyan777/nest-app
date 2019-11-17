// Packages
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Providers
import { BaseService } from '../shared/base.service';

// Entities
import { AttachmentEntity } from './entities/attachment.entity';

// Models
import { IUploadedFile } from './models/uploaded-file.model';

export class AttachmentsService extends BaseService<AttachmentEntity> {
  constructor(
    @InjectRepository(AttachmentEntity)
    private readonly attachmentRepository: Repository<AttachmentEntity>
  ) {
    super(attachmentRepository);
  }

  public async addAttachment(file: IUploadedFile): Promise<AttachmentEntity> {
    const attachment = new AttachmentEntity(file);
    return await this.add(attachment);
  }
}
