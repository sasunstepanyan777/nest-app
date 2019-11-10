// Packages
import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

// Providers
import { UsersService } from '../users/users.service';

// Models
import { IUserBasic } from '../users/models/user.model';
import { TokenPayloadModel } from './models/token-payload.model';

// Entities
import { UserEntity } from '../users/entities/user.entity';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { RegisteredDto } from './dto/registered.dto';
import { LoginedDto } from './dto/logined.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async login(userData: IUserBasic): Promise<LoginedDto> {
    try {
      const user = await this.usersService.findByEmail(userData.email);
      if (user && await compare(userData.password, user.password)) {
        const payload = new TokenPayloadModel(user.id, user.email);
        return {
          access_token: this.jwtService.sign({...payload}),
          username: user.username
        };
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
    throw new UnauthorizedException();
  }

  public async signup(userData: CreateUserDto): Promise<RegisteredDto> {
    const user = await this.usersService.findByEmail(userData.email);
    if (!user) {
      const userToSave = new UserEntity(userData);
      userToSave.password = await hash(userData.password, 5);
      await this.usersService.addUser(userToSave);
      return {
        message: 'You have successfully registered!'
      };
    }
    throw new BadRequestException('User with this email is already exists');
  }
}
