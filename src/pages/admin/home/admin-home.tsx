import { Card, Statistic, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { dashboardStats } from "../../../api/adminService";

const AdminHome = () => {
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
      title="Admin Dashboard"
    >
      <Row gutter={16} justify="center">
        <Col span={12}>
          <Statistic
            title="Total Predictions"
            value={dashboardStatsData.totalPredictions}
            valueStyle={{ color: "#3f8600" }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Users"
            value={dashboardStatsData.total_users}
            valueStyle={{ color: "#1890ff" }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default AdminHome;
