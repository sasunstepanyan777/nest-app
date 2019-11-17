// Packages
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

// Models
import { IAttachment } from '../models/attachment.model';

@Entity('attachments')
export class AttachmentEntity implements IAttachment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public filename: string;

  @Column()
  public mimetype: string;

  @Column()
  public originalname: string;

  constructor(data: IAttachment) {
    if (data) {
      this.filename = data.filename,
      this.mimetype = data.mimetype,
      this.originalname = data.originalname;
    }
  }
}
