// Packages
import { Controller, UseGuards, Get, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

// Providers
import { UsersService } from './users.service';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@ApiUseTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() body: CreateUserDto) {
    return this.usersService.addUser(new UserEntity(body));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    // return req.user;
    console.log(req.user);
  }
}
