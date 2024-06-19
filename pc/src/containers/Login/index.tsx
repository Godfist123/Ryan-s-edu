import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { Space, message, theme, Typography } from "antd";
import styles from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { checkOTP, sendOTP } from "../../graphql/auth";
import { AUTH_TOKEN } from "../../utils/constants";

const Login = () => {
  const { token } = theme.useToken();
  const { Title } = Typography;
  const [runSendOTP] = useMutation(sendOTP);
  const [runCheckOTP] = useMutation(checkOTP);
  const navi = useNavigate();

  interface ILogin {
    mobile: string;
    captcha: string;
    autoLogin: boolean;
  }

  const Login = async (values: ILogin) => {
    const res = await runCheckOTP({
      variables: { tel: values.mobile, code: values.captcha },
    });
    if (res.data.checkOTP.code === 200) {
      if (values.autoLogin)
        localStorage.setItem(AUTH_TOKEN, res.data.checkOTP.token);
      message.success(res.data.checkOTP.message);
      navi("/");
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
        <div style={{ backgroundColor: token.colorBgContainer }}>
          <LoginForm onFinish={Login}>
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileOutlined className={"prefixIcon"} />,
                }}
                name="mobile"
                placeholder={"手机号"}
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
                placeholder={"请输入验证码"}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${"获取验证码"}`;
                  }
                  return "获取验证码";
                }}
                phoneName={"mobile"}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "请输入验证码！",
                  },
                ]}
                onGetCaptcha={async (tel: string) => {
                  const res = await runSendOTP({ variables: { tel } });
                  if (res.data.sendOTP.code === 200) {
                    message.success(res.data.sendOTP.message);
                  } else {
                    message.error(res.data.sendOTP.message);
                  }
                }}
              />
            </>

            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: "right",
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};

export default Login;
