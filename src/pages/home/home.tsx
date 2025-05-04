import React, { useState } from "react";
import { Button, Upload,  } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "../../api/userService";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUploadChange = (info: any) => {
    if (info.file.status === "done") {
      toast.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      toast.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSend = async () => {
    if (imageFile) {
      const result = await uploadImage(imageFile); // Call the uploadImage function
      if (result) {
        toast.success(`Prediction: ${result.prediction}, Confidence: ${result.confidence}`);
      } else {
        toast.error("Image upload failed.");
      }
    } else {
      toast.error("Please upload an image first.");
    }
  };

  return (
    <div>
      <Upload
        beforeUpload={(file) => {
          setImageFile(file);
          return false; // Prevent auto-upload
        }}
        onChange={handleUploadChange}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>

      <Button onClick={handleSend}>Send Image for Prediction</Button>
    </div>
  );
};

export default Home;
