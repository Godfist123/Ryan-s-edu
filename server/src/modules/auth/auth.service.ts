import { Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import ALIYUN from 'src/share/constants/aliyun';
import { UserService } from '../user/user.service';
import { getRandomCodes } from 'src/utils';
import { Result } from 'src/share/dto/result.type';
import { FAIL, FREQUENTLY, SUCCESS } from 'src/share/constants/status_code';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getUserByToken } from './dto/auth-type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async sendOTP(tel: string): Promise<Result> {
    const code = getRandomCodes();
    console.log(this.configService.get<string>('ALIYUN_ACCESS_KEY'));
    const config = new $OpenApi.Config({
      accessKeyId: this.configService.get<any>('ALIYUN_ACCESS_KEY'),
      accessKeySecret: this.configService.get<any>('ALIYUN_SECRET_ACCESS_KEY'),
    });
    config.endpoint = `dysmsapi.aliyuncs.com`;
    const client = new Dysmsapi20170525(config);
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: ALIYUN.SIGN_NAME,
      templateCode: ALIYUN.TEMPLATE_CODE,
      phoneNumbers: tel,
      templateParam: `{"code":"${code}"}`,
    });
    const runtime = new $Util.RuntimeOptions({
      readTimeout: 5000, // Increase read timeout to 5000 milliseconds
      connectTimeout: 5000, // Increase connection timeout if needed
    });

    try {
      const user = await this.userService.findByTel(tel);
      if (user) {
        const diffTime = Date.now() - new Date(user.otpCreateAt).getTime();
        if (diffTime < 60 * 1000) {
          return {
            code: FREQUENTLY,
            message: 'send otp too frequently',
          };
        }
        await client.sendSmsWithOptions(sendSmsRequest, runtime);
        await this.userService.updateOTP(user.id, code);
        return {
          code: SUCCESS,
          message: 'send otp success',
        };
      }
      console.log('createnew');
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
      await this.userService.create({
        tel,
        otp: code,
        otpCreateAt: new Date(),
      });
      return {
        code: SUCCESS,
        message: 'send otp success',
      };
    } catch (error) {
      console.log(error.message);
      console.log(error.data['Recommend']);
      return {
        code: FAIL,
        message: 'send otp failed',
      };
    }
  }

  async checkOTP(tel: string, code: string): Promise<Result> {
    const user = await this.userService.findByTel(tel);
    if (!user) {
      return {
        code: FAIL,
        message: 'user not found',
      };
    }
    const diffTime = Date.now() - new Date(user.otpCreateAt).getTime();
    if (diffTime > 5 * 60 * 60 * 1000) {
      console.log('otp expired');
      return {
        code: FAIL,
        message: 'otp expired',
      };
    }
    if (user.otp === code) {
      const token = this.jwtService.sign({ id: user.id });
      this.userService.updateToken(user.id, token);
      return {
        code: SUCCESS,
        message: 'otp correct',
        data: token,
      };
    }
    return {
      code: FAIL,
      message: 'otp incorrect',
    };
  }

  async getUserByToken(token: string): Promise<getUserByToken> {
    const user = await this.userService.getUserByToken(token);
    if (!user) {
      console.log('user not found');
      return {
        code: FAIL,
        message: 'user not found',
      };
    }
    return {
      code: SUCCESS,
      message: 'get user success',
      data: user,
    };
  }
}
