import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
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
    console.log('key', key);
    const imageStream = await this.awsService.getObject(bucket, key);
    // Set the content type for the response to the correct image type
    res.setHeader('Content-Type', 'image/jpeg');

    // Stream the image directly to the response
    imageStream.pipe(res);
  }

  // @UseGuards(JwtAuthGuard) // Optional, use authentication if necessary
  @Get('generate-upload-url')
  async generateUploadUrl(
    @Query('filename') filename: string,
    @Res() res: Response,
  ) {
    const bucket = 'online-edu-aws'; // Your S3 bucket name
    try {
      const expireSeconds = 300; // URL expiration time, e.g., 5 minutes
      const url = await this.awsService.generateUploadUrl(
        bucket,
        filename,
        expireSeconds,
      );
      console.log('Generated upload URL:', url);
      return res.json({ url });
    } catch (error) {
      console.error('Error generating upload URL:', error);
      return res.status(500).json({ message: 'Failed to generate upload URL' });
    }
  }
}
