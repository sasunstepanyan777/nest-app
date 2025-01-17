// Packages
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginedDto {
  @ApiModelProperty()
  access_token: string;

  @ApiModelProperty()
  refresh_token: string;

  @ApiModelProperty()
  username: string;
}
