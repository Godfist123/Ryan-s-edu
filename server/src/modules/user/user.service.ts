import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = this.userRepository.insert(entity);
    if (res && (await res).raw.affectedRows > 0) {
      return true;
    }
    return false;
  }

  async del(id: string): Promise<boolean> {
    const res = await this.userRepository.delete(id);
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }

  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.userRepository.update(id, entity);
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByTel(tel: string): Promise<User> {
    return this.userRepository.findOne({ where: { tel } });
  }

  async updateOTP(id: string, otp: string): Promise<boolean> {
    const res = await this.userRepository.update(id, {
      otp,
      otpCreateAt: new Date(),
    });
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }

  async updateToken(id: string, token: string): Promise<boolean> {
    const res = await this.userRepository.update(id, { token });
    if (res && res.affected > 0) {
      return true;
    }
    return false;
  }
  async getUserByToken(token: string): Promise<User> {
    return this.userRepository.findOne({ where: { token } });
  }
}
