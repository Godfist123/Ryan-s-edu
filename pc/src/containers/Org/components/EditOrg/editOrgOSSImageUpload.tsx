import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

interface EditOrgOSSImageUploadProps {
  fileList: any[];
  onUpdateFileList: (newFileList: any[]) => void;
}

const EditOrgOSSImageUpload: React.FC<EditOrgOSSImageUploadProps> = ({
  fileList,
  onUpdateFileList,
}) => {
  // Handle file before uploading (optional)
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true; // Do not proceed with upload
  };

  return (
    <div style={{ padding: 20, marginTop: 20 }}>
      <Dragger
        beforeUpload={beforeUpload}
        onRemove={(file) =>
          onUpdateFileList(fileList.filter((f) => f.uid !== file.uid))
        }
        multiple
        customRequest={({ file, onSuccess }) => {
          // Directly manipulate the file list here
          onUpdateFileList([...fileList, file]);
          setTimeout(() => onSuccess && onSuccess("ok"), 0); // Simulate a successful upload
        }}
        fileList={fileList}
        accept="image/jpeg, image/png"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  );
};

export default EditOrgOSSImageUpload;
