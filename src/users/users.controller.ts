// Packages
import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';

// Providers
import { UsersService } from './users.service';

// Dto
import { ProfileDto } from './dto/profile.dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User profile', type: ProfileDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public getProfile(@Req() req: Request): Promise<ProfileDto> {
    return this.usersService.getProfile((req.user as any).id);
  }
}
