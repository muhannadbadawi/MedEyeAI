import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Spin,
  message,
  Image,
  Card,
  Empty,
  Tag,
  Tooltip,
} from "antd";
import { getHistory } from "../../api/userService";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    const data = await getHistory();
    if (data?.history?.length) {
      setHistoryData(
        data.history.sort(
          (a: any, b: any) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    } else {
      message.warning("No history data found.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
    {
      title: "Scan",
      dataIndex: "filename",
      key: "image",
      align: "center" as const,
      render: (filename: string) => (
        <Image
          width={75}
          src={`http://localhost:5000/api/images/${filename}`}
          alt="Scan"
          style={{ borderRadius: 10, objectFit: "cover" }}
          preview={{ mask: "Click to Zoom" }}
          fallback="https://via.placeholder.com/100?text=No+Image"
        />
      ),
    },
    {
      title: "Prediction",
      dataIndex: "prediction",
      key: "prediction",
      align: "center" as const,
      render: (text: string) => (
        <Tag
          color={
            text === "Normal"
              ? "green"
              : text === "Cataract"
              ? "volcano"
              : text === "Glaucoma"
              ? "geekblue"
              : text === "Diabetic Retinopathy"
              ? "purple"
              : "default"
          }
          style={{ fontSize: "0.95rem", padding: "0.3rem 1rem" }}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Confidence",
      dataIndex: "confidence",
      key: "confidence",
      align: "center" as const,
      render: (value: string) => (
        <Tooltip title={value}>
          <Tag color={parseFloat(value.replace("%", "")) > 50 ? "green": "red"}>{value}</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      align: "center" as const,
      render: (value: string) => (
        <span style={{ color: "#666", fontSize: "0.9rem" }}>
          <ClockCircleOutlined style={{ marginRight: 6 }} />
          {new Date(value).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 1100,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        borderRadius: 16,
        background: "#fff",
        margin: "0.5rem auto",
        padding: "1.5rem",
        minHeight: "80vh",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Prediction History
      </Title>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "3rem auto" }} />
      ) : historyData.length ? (
        <Table
          dataSource={historyData}
          columns={columns}
          rowKey={(record) => record.timestamp + record.filename}
          pagination={{ pageSize: 5 }}
          bordered
        />
      ) : (
        <Empty
          description="No history records found"
          style={{ padding: "4rem 0" }}
        />
      )}
    </Card>
  );
};

export default History;
