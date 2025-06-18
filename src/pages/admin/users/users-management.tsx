import { useEffect, useState } from "react";
import {
  List,
  Avatar,
  Typography,
  Spin,
  Empty,
  Button,
  Modal,
  Divider,
} from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteClient, getClients } from "../../../api/adminService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import MyCard from "../../../shared/my-card";

const { Title, Text } = Typography;

const UserManagement = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClients();
        setClients(response.clients || []);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const showUserDetails = (user: any) => {
    navigate(`/admin/user-details/${user.id}`);
  };

  const handleDelete = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  return (
    <MyCard
      styles={{
        maxWidth: 800,
      }}
    >
      <Title level={3} style={{ color: "#fff" }}>
        {t("userManagement.title")}
      </Title>
      <Divider/>
      {loading ? (
        <Spin tip="Loading users..." />
      ) : clients.length === 0 ? (
        <Empty description="No users found" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={clients}
          renderItem={(client) => (
            <List.Item
              actions={[
                <Button
                  key="view"
                  icon={<EyeOutlined />}
                  onClick={() => showUserDetails(client)}
                />,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(client.id)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={client.profile_picture || undefined}>
                    {client.name[0]}
                  </Avatar>
                }
                title={<Text strong style={{ color: "#fff" }}>{client.name}</Text>}
                description={<Text type="secondary" style={{ color: "#fff" }}>{client.email}</Text>}
              />
            </List.Item>
          )}
        />
      )}
      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={async () => {
          try {
            if (selectedUserId) {
              await deleteClient(selectedUserId);
              setClients((prev) => prev.filter((u) => u.id !== selectedUserId));
              toast.success("User deleted successfully");
            }
          } catch {
            toast.error("Failed to delete user");
          } finally {
            setIsModalVisible(false);
          }
        }}
        okText="Yes"
        cancelText="No"
        okType="danger"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </MyCard>
  );
};

export default UserManagement;
