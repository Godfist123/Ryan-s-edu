import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Template } from './models/template.entity';
@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private readonly TemplateRepository: Repository<Template>,
  ) {}

  async create(entity: DeepPartial<Template>): Promise<boolean> {
    const res = await this.TemplateRepository.save(
      this.TemplateRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Template> {
    return this.TemplateRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(
    id: string,
    entity: DeepPartial<Template>,
  ): Promise<boolean> {
    const res = await this.TemplateRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async findTemplates({
    start,
    length,
  }: {
    start: number;
    length: number;
  }): Promise<[Template[], number]> {
    return this.TemplateRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
