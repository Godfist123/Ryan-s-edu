import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Spin,
  message,
} from "antd";
import { useEditInfo, useOrganization } from "../../../../services/org";
import { useEffect, useMemo, useState } from "react";
import { IOrganization } from "../../../../services/org";
import style from "./index.module.scss";
import EditOrgOSSImageUpload from "./editOrgOSSImageUpload";
import axios from "axios";

interface IProp {
  id: string;
  onClose: () => void;
}
interface uploadFile extends File {
  url: string;
}

interface IUploadImages {
  logo: uploadFile[];
  businessLicense: uploadFile[];
  identityCardFrontImg: uploadFile[];
  identityCardBackImg: uploadFile[];
  orgFrontImg: uploadFile[];
  orgRoomImg: uploadFile[];
  orgOtherImg: uploadFile[];
}

const EditOrg = ({ id, onClose }: IProp) => {
  const [form] = Form.useForm();
  const { data, loading: queryLoading } = useOrganization(id);
  const [uploadedImages, setUploadedImages] = useState<IUploadImages>({
    logo: [],
    businessLicense: [],
    identityCardFrontImg: [],
    identityCardBackImg: [],
    orgFrontImg: [],
    orgRoomImg: [],
    orgOtherImg: [],
  });
  const [edit] = useEditInfo();
  useEffect(() => {
    console.log(uploadedImages);
  }, [uploadedImages]);

  const handleImageUpload = (key: keyof IUploadImages, urls: any) => {
    setUploadedImages((prev) => ({ ...prev, [key]: urls }));
  };

  const generateUrlAndUpload = async (
    files: typeof uploadedImages,
    callback: () => void
  ) => {
    const uploadPromises: Promise<boolean>[] = [];
    Object.entries(files).forEach(([key, fileArray]) => {
      fileArray.forEach((file: uploadFile) => {
        const uploadPromise = uploadFile(file, key);
        uploadPromises.push(uploadPromise);
      });
    });

    // Wait for all uploads to complete
    try {
      await Promise.all(uploadPromises);
      callback(); // Call the callback function if all uploads succeed
    } catch (error) {
      message.error("Error during file upload.");
    }
  };

  const uploadFile = async (
    file: uploadFile,
    key: string
  ): Promise<boolean> => {
    try {
      const timestamp = Date.now();
      const response = await axios.get(
        `http://localhost:3000/aws/generate-upload-url?filename=edu-org-${key}/${id}-${key}.jpg-${timestamp}`
      );

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", response.data.url, true);
      xhr.setRequestHeader("Content-Type", file.type);

      return new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            message.success(`${file.name} uploaded successfully!`);
            file.url = `edu-org-${key}%2F${id}-${key}.jpg-${timestamp}`;
            resolve(true);
          } else {
            message.error(`Upload failed for ${file.name}`);
            reject(false);
          }
        };
        xhr.onerror = () => {
          message.error(`Network error during the upload of ${file.name}`);
          reject(false);
        };
        xhr.send(file);
      });
    } catch (error) {
      console.error("Failed to fetch upload URL:", error);
      message.error("Could not get upload URL");
      return false;
    }
  };

  const onFinishHandler = async () => {
    const values = await form.validateFields();
    generateUrlAndUpload(uploadedImages, () => submitFormData(values));
  };

  const submitFormData = (values: any) => {
    const formattedTags = values.tags.join(",");
    const formData = {
      ...values,
      tags: formattedTags,
      logo: uploadedImages.logo[0].url,
      businessLicense: uploadedImages.businessLicense[0].url,
      identityCardFrontImg: uploadedImages.identityCardFrontImg[0].url,
      identityCardBackImg: uploadedImages.identityCardBackImg[0].url,
      orgFrontImg: uploadedImages.orgFrontImg.map((img: any) => ({
        url: img.url,
      })),
      orgRoomImg: uploadedImages.orgRoomImg.map((img: any) => ({
        url: img.url,
      })),
      orgOtherImg: uploadedImages.orgOtherImg.map((img: any) => ({
        url: img.url,
      })),
    } as IOrganization;
    console.log("submitting form data", formData);
    edit(id, formData);
  };
  // const generateUrlAndUpload = (files: typeof uploadedImages) => {
  //   const waitingFiles = Object.entries(files);
  //   waitingFiles.forEach(([key, files]) => {
  //     files.forEach(async (file: uploadFile) => {
  //       if (file) {
  //         console.log(id, key, file);
  //         try {
  //           const timestamp = Date.now();
  //           const response = await axios.get(
  //             `http://localhost:3000/aws/generate-upload-url?filename=edu-org-${key}/${id}-${key}.jpg-${timestamp}`
  //           );
  //           if (file) {
  //             const xhr = new XMLHttpRequest();
  //             xhr.open("PUT", response.data.url, true);
  //             xhr.setRequestHeader("Content-Type", file.type);

  //             xhr.onload = () => {
  //               if (xhr.status === 200) {
  //                 message.success(`${file.name} uploaded successfully!`);
  //                 file.url = `edu-org-${key}%2F${id}-${key}.jpg-${timestamp}`;
  //               } else {
  //                 message.error(`Upload failed for ${file.name}`);
  //               }
  //             };

  //             xhr.onerror = () => {
  //               message.error(
  //                 `Network error during the upload of ${file.name}`
  //               );
  //             };

  //             xhr.send(file);
  //           }
  //         } catch (error) {
  //           console.error("Failed to fetch upload URL:", error);
  //           message.error("Could not get upload URL");
  //         }
  //       }
  //     });
  //   });
  // };
  const initValue = useMemo(
    () =>
      data
        ? {
            ...data,
            tags: data.tags?.split(","),
            logo: [{ url: data.logo }],
            identityCardBackImg: [{ url: data.identityCardBackImg }],
            identityCardFrontImg: [{ url: data.identityCardFrontImg }],
            businessLicense: [{ url: data.businessLicense }],
          }
        : {},
    [data]
  );

  if (queryLoading) {
    return <Spin />;
  }

  return (
    <Drawer
      title="Edit Store Info"
      width="70vw"
      onClose={onClose}
      open
      footerStyle={{ textAlign: "right" }}
      footer={
        <Button type="primary" onClick={onFinishHandler}>
          Save
        </Button>
      }
    >
      <Form form={form} initialValues={initValue} layout="vertical">
        <Row className={style.row} gutter={20}>
          <Col span={10}>
            <Form.Item
              style={{ width: "100%" }}
              label="Logo"
              name="logo"
              rules={[{ required: true }]}
            >
              <EditOrgOSSImageUpload
                fileList={uploadedImages.logo}
                onUpdateFileList={(urls) => handleImageUpload("logo", urls)}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              style={{ width: "100%" }}
              label="name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter Store Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row className={style.row} gutter={20}>
          <Col span={11}>
            <Form.Item label="tags" name="tags" rules={[{ required: true }]}>
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Please enter tags"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="tel" name="tel" rules={[{ required: true }]}>
              <Input placeholder="Please Enter Tel Number" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="longitude"
              name="longitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please enter longitude" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="latitude"
              name="latitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please enter latitude" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="address" name="address" rules={[{ required: true }]}>
          <Input placeholder="Please enter address" />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            maxLength={500}
            rows={5}
            className={style.textArea}
            allowClear
            showCount
          />
        </Form.Item>
        <Row className={style.row} gutter={20}>
          <Col span={8}>
            <Form.Item
              style={{ width: "100%" }}
              label="businessLicense"
              name="businessLicense"
              rules={[{ required: true }]}
            >
              <EditOrgOSSImageUpload
                fileList={uploadedImages.businessLicense}
                onUpdateFileList={(urls) =>
                  handleImageUpload("businessLicense", urls)
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: "100%" }}
              label="identityCardFrontImg"
              name="identityCardFrontImg"
              rules={[{ required: true }]}
            >
              <EditOrgOSSImageUpload
                fileList={uploadedImages.identityCardFrontImg}
                onUpdateFileList={(urls) =>
                  handleImageUpload("identityCardFrontImg", urls)
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: "100%" }}
              label="identityCardBackImg"
              name="identityCardBackImg"
              rules={[{ required: true }]}
            >
              <EditOrgOSSImageUpload
                fileList={uploadedImages.identityCardBackImg}
                onUpdateFileList={(urls) =>
                  handleImageUpload("identityCardBackImg", urls)
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Pictures of Store's front </Divider>
        <Form.Item name="orgFrontImg">
          <EditOrgOSSImageUpload
            fileList={uploadedImages.orgFrontImg}
            onUpdateFileList={(urls) => handleImageUpload("orgFrontImg", urls)}
          />
        </Form.Item>
        <Divider>Pictures of Store's room</Divider>
        <Form.Item name="orgRoomImg">
          <EditOrgOSSImageUpload
            fileList={uploadedImages.orgRoomImg}
            onUpdateFileList={(urls) => handleImageUpload("orgRoomImg", urls)}
          />
        </Form.Item>
        <Divider>Other Pics</Divider>
        <Form.Item name="orgOtherImg">
          <EditOrgOSSImageUpload
            fileList={uploadedImages.orgOtherImg}
            onUpdateFileList={(urls) => handleImageUpload("orgOtherImg", urls)}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditOrg;
