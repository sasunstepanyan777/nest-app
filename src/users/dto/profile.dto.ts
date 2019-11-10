import { ApiModelProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  username: string;
}
