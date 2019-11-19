// Packages
import { Controller, Param, Res, Get } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { Response } from 'express';
import { ApiUseTags, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('attachments')
@ApiUseTags('attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Get(':attachmentId')
  @ApiOkResponse({ description: 'User profile picture' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async serveAvatar(@Param('attachmentId') fileId: string, @Res() res: Response): Promise<any> {
    res.sendFile(fileId, { root: 'attachments' });
  }
}
