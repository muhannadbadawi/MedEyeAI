import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Spin,
  message,
  Image,
  Card,
  Progress,
  Empty,
} from "antd";
import { getHistory } from "../../api/userService";

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
      title: "Image",
      dataIndex: "filename",
      key: "image",
      align: "center",
      render: (filename: string) => (
        <Image
          width={75}
          src={`http://localhost:5000/api/images/${filename}`}
          alt="Scan"
          style={{ borderRadius: 8 }}
          preview={{ mask: "Click to Zoom" }}
          fallback="https://via.placeholder.com/100?text=No+Image"
        />
      ),
    },
    {
      title: "Prediction",
      dataIndex: "prediction",
      key: "prediction",
      align: "center",
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: "#3f3f3f" }}>{text}</span>
      ),
    },
    {
      title: "Confidence",
      dataIndex: "confidence",
      key: "confidence",
      align: "center",
      render: (value: number) => (
        <Progress
          percent={parseFloat((value * 100).toFixed(1))}
          size="small"
          status="active"
          strokeColor={{ from: "#108ee9", to: "#87d068" }}
        />
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      align: "center",
      render: (value: string) => (
        <span style={{ color: "#777" }}>
          {new Date(value).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 1000,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          backgroundColor: "#f0f2f5",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Prediction History
        </Title>

        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "2rem auto" }}
          />
        ) : historyData.length ? (
          <Table
            dataSource={historyData}
            columns={columns}
            rowKey={(record) => record.timestamp + record.filename}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ y: 400 }}
          />
        ) : (
          <Empty
            description="No history records found"
            style={{ padding: "2rem" }}
          />
        )}
      </Card>
    </div>
  );
};

export default History;
