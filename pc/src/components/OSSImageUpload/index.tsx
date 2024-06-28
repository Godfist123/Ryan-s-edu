import React, { useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { updateUser } from "../../graphql/auth";
import { useGetUserByToken } from "../../hooks/useGetUserByToken";
import withUser from "../../utils/context/WithUserContext";

const beforeUpload = (file: File): boolean => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG files!");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
    return false;
  }
  return true; // Proceed with the upload
};

const ImageUpload = (props: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { data } = useGetUserByToken(props);
  const [update] = useMutation(updateUser);
  const timestamp = Date.now();

  useEffect(() => {
    if (data && data.id && file) {
      getPresignedUrl(data.id);
    }
  }, [file]);

  const getPresignedUrl = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/aws/generate-upload-url?filename=edu-user-avatar/${userId}-avatar.jpg-${timestamp}`
      );
      if (file) {
        uploadFileToS3(response.data.url);
      }
    } catch (error) {
      console.error("Failed to fetch upload URL:", error);
      message.error("Could not get upload URL");
    }
  };

  const uploadFileToS3 = (presignedUrl: string) => {
    if (!file) return;

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.onload = () => {
      if (xhr.status === 200) {
        setImageUrl(URL.createObjectURL(file));
        if (data && data.id) {
          updateProfileImageUrl(
            `edu-user-avatar%2F${data.id}-avatar.jpg-${timestamp}`
          );
        }
        setLoading(false);
        message.success("File uploaded successfully");
      } else {
        message.error("Upload failed");
      }
    };
    xhr.onerror = () => {
      message.error("Error during the upload");
    };
    setLoading(true);
    xhr.send(file);
  };

  const updateProfileImageUrl = (avatarUrl: string) => {
    if (data && data.id) {
      update({
        variables: {
          id: data.id,
          params: { avatarUrl },
        },
      });
      props.setUserData({ ...data, avatarUrl });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (beforeUpload(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ) : (
          <PlusOutlined />
        )}
        Upload Image
      </Button>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/jpeg, image/png"
      />
      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img
            src={imageUrl}
            alt="Uploaded avatar"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default withUser(ImageUpload);
