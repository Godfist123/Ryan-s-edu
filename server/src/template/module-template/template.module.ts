import { TemplateResolver } from './template.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Template } from './models/template.entity';
import { TemplateService } from './template.service';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  providers: [TemplateService, TemplateResolver],
  exports: [TemplateService],
})
export class TemplateModule {}
