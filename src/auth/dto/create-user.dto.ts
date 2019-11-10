// Packages
import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty({
    required: true,
    example: 'user@mail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({
    required: true,
    minLength: 8,
    example: 'password'
  })
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @ApiModelProperty({
    required: true,
    minLength: 5,
    example: 'username'
  })
  @IsNotEmpty()
  @MinLength(5)
  readonly username: string;
}
