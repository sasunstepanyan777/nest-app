// Packages
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { UserEntity } from './entities/user.entity';

// Providers
import { BaseService } from '../shared/base.service';
import { AttachmentsService } from '../attachments/attachments.service';

// Models
import { IUploadedFile } from '../attachments/models/uploaded-file.model';

// Dto
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService extends BaseService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly attachmentsService: AttachmentsService
  ) {
    super(userRepository);
  }

  public async getProfile(id: number): Promise<ProfileDto> {
    try {
      const user = await this.findById(id, ['photo']);
      if (user) {
        const { password, ...userData} = user;
        return userData;
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
    throw new NotFoundException();
  }

  public async putProfile(userId: number, file: IUploadedFile, data: UpdateProfileDto): Promise<ProfileDto> {
    try {
      const photo = await this.attachmentsService.addAttachment(file);
      const user = await this.findById(userId);
      user.photo = photo;
      user.username = data.username;
      await this.update(userId, user);
      const {password, ...userData} = user;
      return userData;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
