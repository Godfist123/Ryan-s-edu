import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Course } from './models/course.entity';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly CourseRepository: Repository<Course>,
  ) {}

  async create(entity: DeepPartial<Course>): Promise<boolean> {
    const res = await this.CourseRepository.save(
      this.CourseRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Course> {
    return this.CourseRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, entity: DeepPartial<Course>): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);
    const res = await this.CourseRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findCourses({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Course>;
  }): Promise<[Course[], number]> {
    return this.CourseRepository.findAndCount({
      take: length,
      skip: start,
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const flag = await this.CourseRepository.update(id, {
      deletedBy: userId,
    });
    if (flag) {
      const res = await this.CourseRepository.softDelete(id);
      if (res) {
        return true;
      }
    }
    return false;
  }
}
