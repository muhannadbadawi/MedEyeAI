import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Empty,
  Spin,
  Table,
  Typography,
  Tooltip,
  Tag,
  Button,
  Image,
  Descriptions,
  Divider,
  Avatar,
} from "antd";
import { useTranslation } from "react-i18next";
import {
  ClockCircleOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getUserById } from "../../../../api/userService";
import MyCard from "../../../../shared/my-card";
import i18n from "../../../../i18n/i18n";
type HistoryRecord = {
  filename: string;
  prediction: string;
  confidence: string;
  timestamp: string;
  [key: string]: unknown;
};
const { Title } = Typography;

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUserById(userId);
        setHistoryData(user.history || []);
        setUserInfo(user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

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
      render: (text: string) => {
        const predictionMap: Record<string, string> = {
          Normal: "green",
          Cataract: "volcano",
          Glaucoma: "geekblue",
          "Diabetic Retinopathy": "purple",
          diabetic_retinopathy: "purple",
        };

        const labelMap: Record<string, string> = {
          diabetic_retinopathy: "Diabetic Retinopathy",
        };

        return (
          <Tag
            color={predictionMap[text] || "default"}
            style={{ fontSize: "0.95rem", padding: "0.3rem 1rem" }}
          >
            {labelMap[text] || text}
          </Tag>
        );
      },
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
        maxWidth: 1100,
      }}
    >
      <Button
        icon={
          i18n.language === "en" ? (
            <ArrowLeftOutlined />
          ) : (
            <ArrowRightOutlined />
          )
        }
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          justifySelf: "flex-start",
          marginBottom: 20,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Avatar
          size={90}
          src={
            userInfo?.profile_picture
              ? `http://localhost:5000/api/profilePicture/${userInfo.profile_picture}`
              : undefined
          }
          icon={!userInfo?.profile_picture && <UserOutlined />}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start", // vertically center children
            alignItems: "flex-start", // horizontally center children
            height: "100px",
          }}
        >
          <Title
            level={3}
            style={{
              display: "flex",
              marginBottom: 0,
              color: "#fff",
            }}
          >
            {userInfo?.name || t("historyPage.title")}
          </Title>
          <Typography.Text
            style={{ display: "flex", color: "#fff" }}
            type="secondary"
          >
            {userInfo?.email}
          </Typography.Text>
        </div>
      </div>

      <Divider />

      <Descriptions column={2} size="small" style={{ marginBottom: 20 }}>
        {userInfo?.age && (
          <Descriptions.Item
            label={
              <span style={{ color: "#fff" }}>{t("profilePage.age")}</span>
            }
          >
            <Typography.Text
              style={{ display: "flex", color: "#fff" }}
              type="secondary"
            >
              {userInfo?.age}
            </Typography.Text>
          </Descriptions.Item>
        )}
        {userInfo?.gender && (
          <Descriptions.Item
            label={
              <span style={{ color: "#fff" }}>{t("profilePage.gender")}</span>
            }
          >
            <Typography.Text
              style={{ display: "flex", color: "#fff" }}
              type="secondary"
            >
              {t(`profilePage.${userInfo?.gender.toLowerCase()}`)}
            </Typography.Text>
          </Descriptions.Item>
        )}
      </Descriptions>

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
          description={t("historyPage.noData")}
          style={{ padding: "4rem 0" }}
        />
      )}
    </MyCard>
  );
};

export default UserDetails;
