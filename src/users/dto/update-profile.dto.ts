// Packages
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateProfileDto {

  @ApiModelProperty()
  username: string;
}
