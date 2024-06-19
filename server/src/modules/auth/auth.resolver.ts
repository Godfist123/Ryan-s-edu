import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { plainResult } from 'src/dto/result.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => plainResult)
  async sendOTP(@Args('tel') tel: string): Promise<plainResult> {
    console.log('tel', tel);
    return await this.authService.sendOTP(tel);
  }

  @Mutation(() => plainResult)
  async checkOTP(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<plainResult> {
    return await this.authService.checkOTP(tel, code);
  }
}
