// Packages
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiModelProperty({
    required: true
  })
  @IsNotEmpty()
  refresh_token: string;
}
