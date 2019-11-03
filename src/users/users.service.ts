import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

// Entities
import { UserEntity } from './entities/user.entity';

// Dto
import { CreateUserDto } from './dto/create-user.dto';

// Models
import { IUser } from './models/user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({email});
  }

  public async addUser(userData: IUser) {
    const user = await this.userRepository.findOne({email: userData.email});
    if (!user) {
      const userToSave = new UserEntity(userData);
      userToSave.password = await hash(userData.password, 5);
      await this.userRepository.save(userToSave);
      return {
        success: true
      };
    }
    throw new BadRequestException('User with this email is already exists');
  }
}
