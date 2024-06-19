import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AwsService } from './aws.service';
import { Response } from 'express';
import { JwtAuthGuard } from './aws.guard';
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('file/:key')
  async getFile(@Param('key') key: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'image/jpeg');
    const bucket = 'online-edu-aws';
    const imageStream = await this.awsService.getObject(bucket, key);
    // Set the content type for the response to the correct image type
    res.setHeader('Content-Type', 'image/jpeg');

    // Stream the image directly to the response
    imageStream.pipe(res);
  }

  @Get('publicfile/:key')
  async getPublicFile(@Param('key') key: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'image/jpeg');
    const bucket = 'online-edu-aws';
    const imageStream = await this.awsService.getObject(bucket, key);
    // Set the content type for the response to the correct image type
    res.setHeader('Content-Type', 'image/jpeg');

    // Stream the image directly to the response
    imageStream.pipe(res);
  }
}
