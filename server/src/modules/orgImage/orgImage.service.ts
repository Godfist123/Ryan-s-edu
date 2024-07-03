import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgImage } from './models/orgImage.entity';

@Injectable()
export class OrgImageService {
  constructor(
    @InjectRepository(OrgImage)
    private readonly orgImageRepository: Repository<OrgImage>,
  ) {}

  async deleteByOrg(id: string): Promise<boolean> {
    const imgs = await this.orgImageRepository
      .createQueryBuilder('orgImage')
      .where(`orgImage.orgIdForFrontId = '${id}'`)
      .orWhere(`orgImage.orgIdForRoomId = '${id}'`)
      .orWhere(`orgImage.orgIdForOtherId = '${id}'`)
      .getMany();
    if (imgs.length === 0) {
      return true;
    }
    const delResult = await this.orgImageRepository.delete(
      imgs.map((item) => item.id),
    );
    if (delResult.affected > 0) {
      return true;
    }
    return false;
  }
}
