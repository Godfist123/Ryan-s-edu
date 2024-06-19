import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Readable } from 'stream';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor() {
    const credentials = new AWS.SharedIniFileCredentials({
      profile: 'default',
    });
    AWS.config.credentials = credentials;

    this.s3 = new AWS.S3();
  }

  // Method to get an object from S3
  async getObject(bucket: string, key: string): Promise<Readable> {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    try {
      console.log(params);
      const stream = this.s3.getObject(params).createReadStream();
      return stream;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve object');
    }
  }

  async uploadObject(
    bucket: string,
    key: string,
    body: Buffer | Readable | string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: body,
    };

    try {
      const data = await this.s3.upload(params).promise();
      console.log(`File uploaded successfully at ${data.Location}`);
      return data;
    } catch (err) {
      console.error('S3 upload error:', err);
      throw new Error('Failed to upload file');
    }
  }
}
