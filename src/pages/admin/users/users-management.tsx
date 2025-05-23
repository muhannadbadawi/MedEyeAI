import { useEffect, useState } from "react";
import {
  Card,
  List,
  Avatar,
  Typography,
  Spin,
  Empty,
  Button,
  Modal,
  message,
} from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deleteClient, getClients } from "../../../api/adminService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const { Text } = Typography;
const { confirm } = Modal;

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
    <Card
      title="User Management"
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
                title={<Text strong>{client.name}</Text>}
                description={<Text type="secondary">{client.email}</Text>}
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
              // await deleteClient(selectedUserId); // real API call
              await deleteClient(selectedUserId)
              setClients((prev) => prev.filter((u) => u.id !== selectedUserId));
              toast.success("User deleted successfully");
            }
          } catch {
            message.error("Failed to delete user");
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
    </Card>
  );
};

export default UserManagement;
