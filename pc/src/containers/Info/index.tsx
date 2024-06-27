import React, { useEffect } from "react";
import withUser from "../../utils/context/WithUserContext";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,
  idIDIntl,
} from "@ant-design/pro-components";
import { Col, Row, message } from "antd";
import OSSImageUpload from "../../components/OSSImageUpload";
import { useForm } from "antd/es/form/Form";
import { useMutation } from "@apollo/client";
import { updateUser } from "../../graphql/auth";
import { Form } from "antd/lib";

interface InfoProps {
  // Define your props here
}

const Info: React.FC<InfoProps> = (props) => {
  const { data } = useGetUserByToken(props);
  const [form] = useForm();
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
        style={{}}
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
        <Row>
          <Col>
            <ProFormText
              name="tel"
              label="tel"
              tooltip="unchangeable"
              disabled={true}
            ></ProFormText>
            <ProFormText
              name="name"
              label="name"
              placeholder="Enter your name here"
            ></ProFormText>
            <ProFormTextArea
              name="desc"
              label="description"
              placeholder="Please enter your description"
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OSSImageUpload />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default withUser(Info);
