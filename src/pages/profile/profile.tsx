import { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Modal,
  Avatar,
  Upload,
  message,
  Divider,
  Space,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  LockOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const user = localStorage.getItem('user')
  const userData = user ? JSON.parse(user) : null;

  const handleSave = (values: any) => {
    console.log("Saved values:", values);
    message.success("Profile updated successfully!");
  };

  const handlePasswordChange = (values: any) => {
    console.log("Password change:", values);
    message.success("Password updated successfully!");
    setIsModalVisible(false);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    return false;
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 650,
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
        borderRadius: 20,
        background: "#fff",
        margin: "0.5rem auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Profile
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center" }}
        >
          Manage your personal information
        </Text>

        <Divider />
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{ name: userData.name, email: userData.email }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
            }}
          >
            <Avatar
              size={110}
              src={avatarUrl}
              icon={!avatarUrl && <UserOutlined />}
              style={{
                marginBottom: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "3px solid #f0f0f0",
              }}
            />
            <Upload showUploadList={false} beforeUpload={beforeUpload}>
              <Button icon={<UploadOutlined />} size="small" type="link">
                Change Profile Picture
              </Button>
            </Upload>
          </div>
          <div style={{ width: "60%" }}>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input placeholder="Enter your email" disabled/>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit"
              block
              size="large"
            >
              Save Changes
            </Button>
            <Button
              icon={<LockOutlined />}
              block
              size="large"
              onClick={() => setIsModalVisible(true)}
            >
              Change Password
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title="Change Password"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: "Enter current password" }]}
          >
            <Input.Password placeholder="Current password" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Enter new password" }]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Profile;
