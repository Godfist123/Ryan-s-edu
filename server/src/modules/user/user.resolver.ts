import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user-type';
import { Result } from 'src/share/dto/result.type';
import { FAIL, SUCCESS } from 'src/share/constants/status_code';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Query(() => UserType, { description: 'Find one user' })
  async findOne(@Args('id') id: string): Promise<UserType> {
    return await this.userService.findOne(id);
  }

  @Query(() => UserType, { description: 'Find one user by tel' })
  async findOneByTel(@Args('tel') tel: string): Promise<UserType> {
    return await this.userService.findByTel(tel);
  }

  @Mutation(() => Result, { description: 'Update user' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<Result> {
    const flag = await this.userService.update(id, params);
    if (flag) {
      return { code: SUCCESS, message: 'Update user successfully' };
    }
    return { code: FAIL, message: 'Update user failed' };
  }

  @Mutation(() => Result, { description: 'Delete user' })
  async delete(@Args('id') id: string): Promise<Result> {
    const flag = await this.userService.del(id);
    if (flag) {
      return { code: SUCCESS, message: 'Delete user successfully' };
    } else {
      return { code: FAIL, message: 'Delete user failed' };
    }
  }
}
