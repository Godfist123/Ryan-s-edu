import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Result } from 'src/share/dto/result.type';
import { getUserByToken } from './dto/auth-type';
import { GqlAuthGuard } from './auth.guard';
import { UseGuards } from '@nestjs/common';
import {
  ACCOUNT_NOT_EXIST,
  LOGIN_ERROR,
  SUCCESS,
  ACCOUNT_EXIST,
  REGISTER_ERROR,
} from 'src/share/constants/status_code';
import { accountAndPwdValidate } from 'src/utils';
import { StudentService } from '../student/student.service';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
    private jwtService: JwtService,
  ) {}

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
    return res;
  }

  @Mutation(() => Result, { description: 'Student Login' })
  async studentLogin(
    @Args('account') account: string,
    @Args('password') password: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (!student) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: 'Account does not exist',
      };
    }
    if (student.password === md5(password)) {
      const token = this.jwtService.sign({
        id: student.id,
      });
      return {
        code: SUCCESS,
        message: 'Success',
        data: token,
      };
    }
    return {
      code: LOGIN_ERROR,
      message: 'Login failed',
    };
  }

  @Mutation(() => Result, { description: 'Student register' })
  async studentRegister(
    @Args('account') account: string,
    @Args('password') password: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (student) {
      return {
        code: ACCOUNT_EXIST,
        message: 'Account already exists',
      };
    }
    const res = await this.studentService.create({
      account,
      password: md5(password),
    });
    if (res) {
      return {
        code: SUCCESS,
        message: 'Register success',
      };
    }
    return {
      code: REGISTER_ERROR,
      message: 'Register failed',
    };
  }
}
