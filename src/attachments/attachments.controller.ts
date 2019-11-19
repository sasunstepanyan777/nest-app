// Packages
import { Controller, Param, Res, Get, HttpStatus, NotFoundException } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { Response } from 'express';
import { ApiUseTags, ApiInternalServerErrorResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('attachments')
@ApiUseTags('attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Get(':attachmentId')
  @ApiOkResponse({ description: 'User profile picture' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async serveAvatar(@Param('attachmentId') fileId: string, @Res() res: Response): Promise<void> {
    res.sendFile(fileId, { root: 'attachments' }, (err: NodeJS.ErrnoException) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return res.status(HttpStatus.NOT_FOUND).send({
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Not Found'
          });
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error'
        });
      }
    });
  }
}
