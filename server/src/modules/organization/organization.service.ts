import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Organization } from './models/organization.entity';
@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly OrganizationRepository: Repository<Organization>,
  ) {}

  async create(entity: DeepPartial<Organization>): Promise<boolean> {
    const res = await this.OrganizationRepository.save(
      this.OrganizationRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Organization> {
    return this.OrganizationRepository.findOne({
      where: {
        id,
      },
      relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'],
    });
  }

  async updateById(
    id: string,
    entity: DeepPartial<Organization>,
  ): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);
    const res = await this.OrganizationRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findOrganizations({
    start,
    length,
  }: {
    start: number;
    length: number;
  }): Promise<[Organization[], number]> {
    return this.OrganizationRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
      relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'],
    });
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const flag = await this.OrganizationRepository.update(id, {
      deletedBy: userId,
    });
    if (flag) {
      const res = await this.OrganizationRepository.softDelete(id);
      if (res) {
        return true;
      }
    }
    return false;
  }
}
