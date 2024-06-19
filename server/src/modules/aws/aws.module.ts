import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { JwtAuthGuard } from './aws.guard';

@Module({
  controllers: [AwsController],
  providers: [AwsService, JwtAuthGuard],
  exports: [AwsService],
})
export class AwsModule {}
