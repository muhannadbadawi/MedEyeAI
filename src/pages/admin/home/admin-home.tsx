import { Typography } from "antd";
import { useEffect, useState } from "react";
import { dashboardStats } from "../../../api/adminService";
import MyCard from "../../../shared/my-card";
import { useTranslation } from "react-i18next";
const { Title, Paragraph } = Typography;

const AdminHome = () => {
  const { t } = useTranslation();

  const [dashboardStatsData, setDashboardStatsData] = useState({
    totalPredictions: 0,
    total_users: 0,
  });

  const getDashboardStats = async () => {
    try {
      const data = await dashboardStats();
      setDashboardStatsData({
        totalPredictions: data.total_predictions,
        total_users: data.total_users,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <MyCard
        styles={{
          maxWidth: 220,
        }}
      >
        <Title level={4} style={{ color: "#fff" }}>
          Total Predictions
        </Title>
        <Paragraph style={{ color: "#fff" }}>
          {dashboardStatsData.totalPredictions}
        </Paragraph>
        {/* <Statistic
          title="Total Predictions"
          value={dashboardStatsData.totalPredictions}
          valueStyle={{ color: "#3f8600" }}
        /> */}
      </MyCard>
      <MyCard
        styles={{
          maxWidth: 220,
        }}
      >
        <Title level={4} style={{ color: "#fff" }}>
          Total Users
        </Title>
        <Paragraph style={{ color: "#fff" }}>
          {dashboardStatsData.total_users}
        </Paragraph>
        {/* <Statistic
          title="Total Users"
          value={dashboardStatsData.total_users}
          valueStyle={{ color: "#3f8600" }}
        /> */}
      </MyCard>
    </div>
  );
};

export default AdminHome;
