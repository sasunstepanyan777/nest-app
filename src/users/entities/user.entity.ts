// Packages
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

// Models
import { IUser } from '../models/user.model';
import { IAttachment } from 'src/attachments/models/attachment.model';

// Entities
import { AttachmentEntity } from '../../attachments/entities/attachment.entity';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public username: string;

  @OneToOne(type => AttachmentEntity)
  @JoinColumn()
  public photo: IAttachment;

  constructor(data: IUser) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      this.username = data.username;
      if (data.id) {
        this.photo = data.photo;
      }
    }
  }
}
