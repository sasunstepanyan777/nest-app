// Packages
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({
    required: true
  })
  readonly email: string;

  @ApiModelProperty({
    required: true,
    minLength: 8
  })
  readonly password: string;

  @ApiModelProperty({
    required: true,
    minLength: 5
  })
  readonly username: string;
}
