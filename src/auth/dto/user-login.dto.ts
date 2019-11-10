// Packages
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDto {
  @ApiModelProperty({
    required: true,
    example: 'user@mail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({
    required: true,
    example: 'password'
  })
  @IsNotEmpty()
  readonly password: string;
}
