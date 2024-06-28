import {
  SUCCESS,
  NOT_EMPTY,
  VALIDATE_ERROR,
} from 'src/share/constants/status_code';
import { Result } from 'src/share/dto/result.type';

export const getRandomCodes = () => {
  const codes = [];
  for (let i = 0; i < 4; i++) {
    codes.push(Math.floor(Math.random() * 10));
  }
  return codes.join('');
};

export const accountAndPwdValidate = (
  account: string,
  password: string,
): Result => {
  if (!account || !password) {
    return {
      code: NOT_EMPTY,
      message: '账号或者密码不能为空',
    };
  }
  if (!/^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/.test(account)) {
    return {
      code: VALIDATE_ERROR,
      message: '账号校验失败，请重新输入账号',
    };
  }
  return {
    code: SUCCESS,
  };
};
