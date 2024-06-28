import React, { useEffect } from "react";
import withUser from "../../utils/context/WithUserContext";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Col, Row, message, Form } from "antd";
import OSSImageUpload from "../../components/OSSImageUpload";
import { useForm } from "antd/es/form/Form";
import { useMutation } from "@apollo/client";
import { updateUser } from "../../graphql/auth";
import { useNavigate } from "react-router-dom";

interface InfoProps {
  // Define your props here
}

const Info: React.FC<InfoProps> = (props) => {
  const { data } = useGetUserByToken(props);
  const [form] = useForm();
  const Navi = useNavigate();
  const [updateUserInfo] = useMutation(updateUser);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        tel: data.tel,
        name: data.name,
        desc: data.desc,
      });
    }
  }, [data, form]);

  return (
    <PageContainer title={false}>
      <ProForm
        form={form}
        layout="horizontal"
        onFinish={async (values) => {
          const flag = await updateUserInfo({
            variables: {
              id: data.id,
              params: { name: values.name, desc: values.desc },
            },
          });
          if (flag.data.update.code === 200) {
            message.success(flag.data.update.message);
            Navi("/");
            return;
          } else {
            message.error(flag.data.update.message);
          }
        }}
        submitter={{
          resetButtonProps: {
            style: {
              display: "none",
            },
          },
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <ProFormText
              name="tel"
              label="Tel"
              tooltip="unchangeable"
              disabled
            />
            <ProFormText
              name="name"
              label="Name"
              placeholder="Enter your name here"
            />
            <ProFormTextArea
              name="desc"
              label="Description"
              placeholder="Please enter your description"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="avatar" label="Avatar">
              <OSSImageUpload />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default withUser(Info);
