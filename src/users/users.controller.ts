// Packages
import { Controller, UseGuards, Get, Req, Put, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

// Providers
import { UsersService } from './users.service';

// Dto
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

// Models
import { IUser } from './models/user.model';
import { IUploadedFile } from '../attachments/models/uploaded-file.model';

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
  public async getProfile(@Req() req: Request): Promise<ProfileDto> {
    return this.usersService.getProfile((req.user as IUser).id);
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'photo', required: true })
  @UseInterceptors(FileInterceptor('photo'))
  @ApiOkResponse({ description: 'User profile', type: ProfileDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  public async putProfile(@Req() req: Request, @UploadedFile() file: IUploadedFile, @Body() userData: UpdateProfileDto): Promise<ProfileDto> {
    return this.usersService.putProfile((req.user as IUser).id, file, userData);
  }
}
