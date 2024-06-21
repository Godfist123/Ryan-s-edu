import React, { useEffect, useContext, useState } from "react";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { Space, message, Typography } from "antd";
import styles from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { checkOTP, getUserByTel, sendOTP } from "../../graphql/auth";
import { AUTH_TOKEN } from "../../utils/constants";
import { UserContext } from "../../utils/context/UserContext";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";
interface ILogin {
  mobile: string;
  captcha: string;
  autoLogin: boolean;
}

const Login: React.FC<WithUserDataProps> = ({ setUserData }) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const [runSendOTP] = useMutation(sendOTP);
  const [runCheckOTP] = useMutation(checkOTP);

  const [mobile, setMobile] = useState<string>("");

  // Fetch user data using useQuery
  const { data } = useQuery(getUserByTel, {
    variables: { tel: mobile },
    skip: !mobile, // Skip query if mobile number is not set
  });

  // Effect to update context after data is fetched
  useEffect(() => {
    if (data && data.findOneByTel) {
      setUserData({
        name: data.findOneByTel.name,
        desc: data.findOneByTel.desc,
        account: data.findOneByTel.account,
      });
      console.log("data", data.findOneByTel.name);
      navigate("/");
    }
  }, [mobile, data]);

  const handleLogin = async (values: ILogin) => {
    const res = await runCheckOTP({
      variables: { tel: values.mobile, code: values.captcha },
    });
    if (res.data.checkOTP.code === 200) {
      localStorage.setItem(AUTH_TOKEN, res.data.checkOTP.token);
      message.success("Login successful");
      setMobile(values.mobile);
      // navigate("/");
    } else {
      message.error(res.data.checkOTP.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <Space>
            <Title>
              <img
                style={{ width: 40, marginTop: 10, marginLeft: 20 }}
                src="http://localhost:3000/aws/publicfile/icon.jpg"
              />
            </Title>
            <Title>Ryan's Online Edu</Title>
          </Space>
        </Link>
      </div>
      <ProConfigProvider hashed={false}>
        <div
          style={{
            backgroundColor:
              "token.colorBgContainer" /* Update your color token usage here */,
          }}
        >
          <LoginForm onFinish={handleLogin}>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className={"prefixIcon"} />,
              }}
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: "请输入手机号！",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder="请输入验证码"
              captchaTextRender={(timing, count) =>
                timing ? `${count} 获取验证码` : "获取验证码"
              }
              phoneName="mobile"
              name="captcha"
              rules={[{ required: true, message: "请输入验证码！" }]}
              onGetCaptcha={async (tel) => {
                const res = await runSendOTP({ variables: { tel } });
                if (res.data.sendOTP.code === 200) {
                  message.success(res.data.sendOTP.message);
                } else {
                  message.error(res.data.sendOTP.message);
                }
              }}
            />
            <div style={{ marginBlockEnd: 24 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a style={{ float: "right" }}>忘记密码</a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};

const LoginWithUser = withUser(Login);
export default LoginWithUser;
