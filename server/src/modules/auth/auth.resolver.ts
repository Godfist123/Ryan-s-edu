import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Result } from 'src/dto/result.type';
import { getUserByToken } from './dto/auth-type';
import { GqlAuthGuard } from './auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Result)
  async sendOTP(@Args('tel') tel: string): Promise<Result> {
    console.log('tel', tel);
    return await this.authService.sendOTP(tel);
  }

  @Mutation(() => Result)
  async checkOTP(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<Result> {
    return await this.authService.checkOTP(tel, code);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => getUserByToken, { nullable: true })
  async getUserByToken(@Args('token') token: string): Promise<getUserByToken> {
    const res = await this.authService.getUserByToken(token);
    console.log('res', res.data.name);
    return res;
  }
}
