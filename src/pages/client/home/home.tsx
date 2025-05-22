import React, { useState } from "react";
import { Button, Upload, Card, Typography, Space, Image, Divider } from "antd";
import { UploadOutlined, DeleteOutlined, CameraOutlined } from "@ant-design/icons";
import { uploadImage } from "../../../api/userService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const { t } = useTranslation();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{
    prediction: string;
    confidence: number;
  } | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const handleUploadChange = (info: any) => {
    if (info.file.status === "done") {
      toast.success(`${info.file.name} ${t("toast.uploadSuccess")}`);
    } else if (info.file.status === "error") {
      toast.error(`${info.file.name} ${t("toast.uploadFailed")}`);
    }
  };
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      toast.error(t("toast.cameraAccessDenied"));
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (context) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      context.drawImage(videoRef.current, 0, 0, width, height);

      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured-image.jpg", {
            type: "image/jpeg",
          });
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file));
          toast.success(t("toast.imageCaptured"));
          stopCamera();
        }
      }, "image/jpeg");
    }
  };

  const stopCamera = () => {
    setShowCamera(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
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
        toast.error(t("toast.imageUploadFailed"));
        setPredictionResult(null);
      }
    } else {
      toast.error(t("toast.pleaseUpload"));
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
        alignItems: "center",
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
        <Title level={3}>{t("MainScreen.title")}</Title>
        <Text type="secondary">{t("MainScreen.description2")}</Text>
        {!showCamera ? (
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
                {imageFile ? imageFile.name : t("upload.noFileSelected")}
              </Text>
              <Button block icon={<UploadOutlined />} loading={loading}>
                {t("upload.uploadImage")}
              </Button>
            </Upload>
            <Button
              block
              onClick={startCamera}
              loading={loading}
              disabled={showCamera}
              icon={<CameraOutlined />}
            >
              {t("upload.takePhoto")}
            </Button>
            <Button
              type="primary"
              size="large"
              block
              onClick={handleSend}
              disabled={!imageFile}
              loading={loading}
            >
              {t("upload.sendForPrediction")}
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
              {t("upload.clear")}
            </Button>
          </Space>
        ) : (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <video
              ref={videoRef}
              style={{ width: "100%", maxHeight: 300, borderRadius: 8 }}
              autoPlay
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <Space style={{ marginTop: 8 }}>
              <Button type="primary" onClick={capturePhoto}>
                {t("upload.capture")}
              </Button>
              <Button danger onClick={stopCamera}>
                {t("upload.cancel")}
              </Button>
            </Space>
          </div>
        )}
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
                {t("result.diagnosis")}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Text>
                  <strong>{t("result.prediction")}:</strong>{" "}
                  {predictionResult.prediction}
                </Text>
                <br />
                <Text>
                  <strong>{t("result.confidence")}:</strong>{" "}
                  {predictionResult.confidence}
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
