import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({email});
  }

  public async addUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
