import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';
import { Controller, Get } from '@nestjs/common';
import { AwsService } from './modules/aws/aws.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly awsService: AwsService,
  ) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: 'John Doe',
      desc: 'This is a test user',
      tel: '1234567890',
      password: 'password',
      account: 'john.doe',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('a5cb01b8-68ef-44d9-8372-211060be5435');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      'c426915d-d346-4757-9d56-1b0abe43a476',
      {
        name: 'Jane Doe',
        desc: 'This is a test user',
      },
    );
  }

  @Get('/findOne')
  async findOne(): Promise<User> {
    return await this.userService.getUserByToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlYzA3YmI0LTZkYzktNDY2MS04NWNlLWI4ODNjMDJhYWI1ZSIsImlhdCI6MTcxOTIwOTE0OCwiZXhwIjoxNzE5Mjk1NTQ4fQ.-qBI9FYa2_KTxKVS0Rt0s6JSKpVVd-cm6xs-cvQLd4E',
    );
  }
}
