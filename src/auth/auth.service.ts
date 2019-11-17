// Packages
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

// Providers
import { UsersService } from '../users/users.service';
import { ConfigService } from '../config/config.service';

// Models
import { IUserBasic, IUser } from '../users/models/user.model';
import { TokenPayloadModel } from './models/token-payload.model';

// Entities
import { UserEntity } from '../users/entities/user.entity';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { RegisteredDto } from './dto/registered.dto';
import { LoginedDto } from './dto/logined.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenRefreshedDto } from './dto/token-refreshed.dto';

// Config
import { ConfigEnum } from '../config/config.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async login(userData: IUserBasic): Promise<LoginedDto> {
    try {
      const user = await this.usersService.findOne({email: userData.email});
      if (user && await compare(userData.password, user.password)) {
        const payload = new TokenPayloadModel(user.id, user.email);
        return {
          ...this.signTokens(payload),
          username: user.username,
        };
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
    throw new BadRequestException('Invalid email or password');
  }

  public async signup(userData: CreateUserDto): Promise<RegisteredDto> {
    try {
      const user = await this.usersService.findOne({email: userData.email});
      if (!user) {
        const userToSave = new UserEntity(userData);
        userToSave.password = await hash(userData.password, 5);
        await this.usersService.add(userToSave);
        return {
          message: 'You have successfully registered!'
        };
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
    throw new BadRequestException('User with this email is already exists');
  }

  public async refreshToken(data: RefreshTokenDto): Promise<TokenRefreshedDto> {
    try {
      const payload: TokenPayloadModel = await this.jwtService.verify(data.refresh_token);
      const user = await this.usersService.findOne({id: payload.userId});
      if (!user) {
        throw new BadRequestException('Invalid token');
      }
      const newPayload = new TokenPayloadModel(user.id, user.email);
      return this.signTokens(newPayload);
    } catch (err) {
      console.log(err);
      if (err instanceof TokenExpiredError) {
        throw new BadRequestException('Token expired');
      }
      if (err instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }
      throw new InternalServerErrorException();
    }
  }

  public async validateUser(id: number): Promise<IUser> {
    return this.usersService.findById(id);
  }

  private signTokens(payload: TokenPayloadModel): TokenRefreshedDto {
    return {
      access_token: this.jwtService.sign({...payload}),
      refresh_token: this.jwtService.sign({...payload}, { expiresIn: this.configService.get(ConfigEnum.JWT_REFRESH_EXPIRE) })
    };
  }
}
