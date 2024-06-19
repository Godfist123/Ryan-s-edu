import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user-type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Query(() => UserType, { description: 'Find one users' })
  async findOne(@Args('id') id: string): Promise<UserType> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => Boolean, { description: 'Update user' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<boolean> {
    return await this.userService.update(id, params);
  }

  @Mutation(() => Boolean, { description: 'Delete user' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }
}
