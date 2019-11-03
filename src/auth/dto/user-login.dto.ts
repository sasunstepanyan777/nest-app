// Packages
import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiModelProperty({
    required: true
  })
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;
}
