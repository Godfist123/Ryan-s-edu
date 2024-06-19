import { Injectable } from '@nestjs/common';
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import ALIYUN from 'src/constants/aliyun';
import { UserService } from '../user/user.service';
import { getRandomCodes } from 'src/utils';
import { plainResult } from 'src/dto/result.type';
import { FAIL, FREQUENTLY, SUCCESS } from 'src/constants/status_code';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async sendOTP(tel: string): Promise<plainResult> {
    const code = getRandomCodes();
    const config = new $OpenApi.Config({
      accessKeyId: ALIYUN.ACCESS_KEY,
      accessKeySecret: ALIYUN.ACCESS_SECRET,
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

  async checkOTP(tel: string, code: string): Promise<plainResult> {
    const user = await this.userService.findByTel(tel);
    if (!user) {
      return {
        code: FAIL,
        message: 'user not found',
      };
    }
    const diffTime = Date.now() - new Date(user.otpCreateAt).getTime();
    if (diffTime > 5 * 60 * 1000) {
      console.log('otp expired');
      return {
        code: FAIL,
        message: 'otp expired',
      };
    }
    if (user.otp === code) {
      const token = this.jwtService.sign({ id: user.id });
      return {
        code: SUCCESS,
        message: 'otp correct',
        token: token,
      };
    }
    return {
      code: FAIL,
      message: 'otp incorrect',
    };
  }
}
