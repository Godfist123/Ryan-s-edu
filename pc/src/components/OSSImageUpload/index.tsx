import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import axios from "axios";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";
import withUser from "../../utils/context/WithUserContext";
import { useMutation } from "@apollo/client";
import { updateUser } from "../../graphql/auth";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const OSSImageUpload: React.FC = (props) => {
  const [update] = useMutation(updateUser);
  const { data } = useGetUserByToken(props);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploadUrl, setUploadUrl] = useState<string>();
  useEffect(() => {
    if (data && data.id) {
      axios
        .get(
          `http://localhost:3000/aws/generate-upload-url?filename=edu-user-avatar%2F${data.id}-avatar.jpg`
        )
        .then((response) => {
          setUploadUrl(response.data.url);
        })
        .catch((error) => {
          console.error("Failed to fetch upload URL:", error);
          message.error("Could not get upload URL");
        });
    }
  }, [data]);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        update({
          variables: {
            id: data.id,
            params: {
              avatarUrl: `edu-user-avatar%2F${data.id}-avatar.jpg`,
            },
          },
        });
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    console.log("uploadUrl", uploadUrl),
    (
      <Upload
        headers={{ "Content-Type": "application/octet-stream" }}
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action={uploadUrl}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        method="put"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  );
};

export default withUser(OSSImageUpload);
