import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect } from "react";
import { useEditCourseInfo, useGetCourseInfo } from "../../../services/course";

interface EditCourseProps {
  id?: string;
  onClose: () => void;
  onCloseAndRefetch: () => void;
}

const EditCourse: React.FC<EditCourseProps> = ({
  onClose,
  id,
  onCloseAndRefetch,
}) => {
  const [form] = useForm();
  const [handleEdit, loading] = useEditCourseInfo();
  const { refetch } = useGetCourseInfo();
  useEffect(() => {
    if (id) {
      refetch({ id }).then((res) => {
        form.setFieldsValue(res.data.getCourseInfo.data);
      });
    } else {
      form.resetFields();
    }
  }, [id]);

  const onSubmitHandler = async () => {
    const data = await form.validateFields();
    if (data) {
      handleEdit(id, data, onCloseAndRefetch);
    }
  };
  return (
    <div>
      <Drawer
        title={id ? "Edit Course" : "Create New Course"}
        width={720}
        onClose={onClose}
        open
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmitHandler} type="primary" loading={loading}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form}>
          <Form.Item
            label="Course Name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={5} showCount />
          </Form.Item>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Maximum Students"
                name="maximum"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={0} addonAfter="person" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Course Duration"
                name="duration"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={0} addonAfter="hours" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Age Group"
            name="group"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Course Prerequisites"
            name="prerequisites"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Appointment Info"
            name="appointment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Refund Info"
            name="refund"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Other Info"
            name="other"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default EditCourse;
