import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Image, Empty, Tag, Tooltip } from "antd";
import { getHistory } from "../../../api/userService";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import MyCard from "../../../shared/my-card";

const { Title, Text } = Typography;

type HistoryRecord = {
  filename: string;
  prediction: string;
  confidence: string;
  timestamp: string;
};

const History: React.FC = () => {
  const { t } = useTranslation();
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  type GetHistoryResponse = {
    history?: HistoryRecord[];
    [key: string]: unknown;
  };

  const fetchHistory = async () => {
    setLoading(true);
    const data = (await getHistory()) as GetHistoryResponse;
    if (data?.history?.length && data.history.length > 0) {
      setHistoryData(
        data.history.sort(
          (a: HistoryRecord, b: HistoryRecord) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
    {
      title: t("historyPage.scan"),
      dataIndex: "filename",
      key: "image",
      align: "center" as const,
      render: (filename: string) => (
        <Image
          width={75}
          src={`http://localhost:5000/api/images/${filename}`}
          alt={t("historyPage.scan")}
          style={{ borderRadius: 10, objectFit: "cover" }}
          preview={{ mask: t("historyPage.zoomImage") }}
          fallback="https://via.placeholder.com/100?text=No+Image"
        />
      ),
    },
    {
      title: t("historyPage.prediction"),
      dataIndex: "prediction",
      key: "prediction",
      align: "center" as const,
      render: (text: string) => (
        <Tag style={{ fontSize: "0.95rem", padding: "0.3rem 1rem" }}>
          {text}
        </Tag>
      ),
    },
    {
      title: t("historyPage.confidence"),
      dataIndex: "confidence",
      key: "confidence",
      align: "center" as const,
      render: (value: string) => (
        <Tooltip title={value}>
          <Tag
            color={parseFloat(value.replace("%", "")) > 50 ? "green" : "red"}
          >
            {value}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: t("historyPage.recommendation"),
      dataIndex: "recommendation",
      key: "recommendation",
      align: "center" as const,
      render: (text: string) => (
        <Text
          color={
            text === "Consult an ophthalmologist"
              ? "red"
              : text === "Follow up in 6 months"
              ? "orange"
              : "green"
          }
          style={{ fontSize: "0.95rem", padding: "0.3rem 1rem" }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: t("historyPage.date"),
      dataIndex: "timestamp",
      key: "timestamp",
      align: "center" as const,
      render: (value: string) => (
        <span
          style={{
            color: "#666",
            fontSize: "0.9rem",
            display: "flex",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClockCircleOutlined style={{ marginRight: 6 }} />
          {new Date(value).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <MyCard
      styles={{
        maxWidth: 1200,
      }}
    >
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: 30, color: "#ffffff" }}
      >
        {t("historyPage.title")}
      </Title>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "3rem auto" }} />
      ) : historyData.length > 0 ? (
        <Table
          dataSource={historyData}
          columns={columns}
          rowKey={(record) => record.timestamp + record.filename}
          pagination={{ pageSize: 3 }}
          bordered
        />
      ) : (
        <Empty
          description={t("historyPage.noData")}
          style={{ padding: "4rem 0" }}
        />
      )}
    </MyCard>
  );
};

export default History;
