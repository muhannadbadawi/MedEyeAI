import React, { useState } from "react";
import { Typography, Upload, Button, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Title } = Typography;

const Home: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const props: UploadProps = {
    name: "file",
    listType: "picture",
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      return false; // Prevent auto upload
    },
  };

  return (
    <div
      style={{
        padding: 20,
        background: "linear-gradient(to right,rgb(155, 156, 156), #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        height: "100%",
      }}
    >
      <Title level={2}>Welcome to the Home Page</Title>
      <p>This is a basic placeholder for your home screen.</p>

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <Image
            src={imageUrl}
            alt="Uploaded preview"
            style={{ maxHeight: 200 }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
