// Packages
import { ApiModelProperty } from '@nestjs/swagger';

// Models
import { IAttachment } from '../../attachments/models/attachment.model';

export class ProfileDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  photo: IAttachment;
  
}
