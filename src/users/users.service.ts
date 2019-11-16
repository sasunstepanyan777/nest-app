// Packages
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { UserEntity } from './entities/user.entity';

// Providers
import { BaseService } from '../shared/base.service';

// Dto
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class UsersService extends BaseService<UserEntity> {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super(userRepository);
  }

  public async getProfile(id: number): Promise<ProfileDto> {
    try {
      const user = await this.findById(id);
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
}
