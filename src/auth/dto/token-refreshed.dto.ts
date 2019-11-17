// Packages
import { ApiModelProperty } from '@nestjs/swagger';

export class TokenRefreshedDto {
  @ApiModelProperty()
  refresh_token: string;

  @ApiModelProperty()
  access_token: string;
}
