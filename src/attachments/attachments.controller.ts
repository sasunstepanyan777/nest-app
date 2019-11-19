// Packages
import { Controller, Param, Res, Get } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { Response } from 'express';

@Controller('attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Get(':attachmentId')
  async serveAvatar(@Param('attachmentId') fileId: string, @Res() res: Response): Promise<any> {
    res.sendFile(fileId, { root: 'attachments' });
  }
}
