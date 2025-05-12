import React, { useState } from "react";
import { Button, Upload, Card, Typography, Space, Image, Divider } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { uploadImage } from "../../api/userService";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{
    prediction: string;
    confidence: number;
  } | null>(null);

  const handleUploadChange = (info: any) => {
    if (info.file.status === "done") {
      toast.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      toast.error(`${info.file.name} upload failed.`);
    }
  };

  const handleSend = async () => {
    if (imageFile) {
      setLoading(true);
      const result = await uploadImage(imageFile);
      setLoading(false);
      if (result) {
        setPredictionResult({
          prediction: result.prediction,
          confidence: result.confidence,
        });
      } else {
        toast.error("Image upload failed.");
        setPredictionResult(null);
      }
    } else {
      toast.error("Please upload an image first.");
    }
  };

  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    setPredictionResult(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        height: "85vh",
        gap: 16,
        margin: "0 auto",
        maxWidth: 900,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
          padding: 24,
          background: "#ffffff",
          margin: "0.5rem auto",
        }}
        bordered={false}
      >
        <Title level={3}>
          Eye Condition Predictor
        </Title>
        <Text type="secondary">Upload an eye image to get a diagnosis</Text>

        <Space
          direction="vertical"
          size="large"
          style={{ marginTop: 32, width: "100%" }}
        >
          <Upload
            beforeUpload={(file) => {
              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
              return false;
            }}
            onChange={handleUploadChange}
            showUploadList={false}
            accept="image/*"
          >
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 4 }}
            >
              {imageFile ? imageFile.name : "No file selected"}
            </Text>
            <Button block icon={<UploadOutlined />} loading={loading}>
              Upload Image
            </Button>
          </Upload>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleSend}
            disabled={!imageFile}
            loading={loading}
          >
            Send Image for Prediction
          </Button>

          <Button
            danger
            size="middle"
            block
            icon={<DeleteOutlined />}
            onClick={handleClear}
            disabled={!imageFile}
            loading={loading}
          >
            Clear
          </Button>
        </Space>
      </Card>
      {predictionResult && (
        <Card
          style={{
            width: "100%",
            maxWidth: 460,
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
            padding: 24,
            background: "#ffffff",
            margin: "0.5rem auto",
          }}
          bordered={false}
        >
          {imagePreview && (
            <div
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                padding: 8,
                background: "#fafafa",
              }}
            >
              <Image
                src={imagePreview}
                alt="Uploaded preview"
                width="70%"
                style={{
                  borderRadius: 4,
                  objectFit: "contain",
                  maxHeight: 120,
                }}
              />
            </div>
          )}
          <>
            <Divider />
            <Card
              style={{
                backgroundColor: "#f6ffed",
                borderColor: "#b7eb8f",
                borderRadius: 12,
                textAlign: "left",
              }}
              size="small"
            >
              <Text strong style={{ fontSize: 16, color: "#389e0d" }}>
                Diagnosis Result
              </Text>
              <div style={{ marginTop: 8 }}>
                <Text>
                  <strong>Prediction:</strong> {predictionResult.prediction}
                </Text>
                <br />
                <Text>
                  <strong>Confidence:</strong> {predictionResult.confidence}
                </Text>
              </div>
            </Card>
          </>
        </Card>
      )}
    </div>
  );
};

export default Home;
