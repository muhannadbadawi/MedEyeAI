import { useState } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Modal,
  Avatar,
  Upload,
  Divider,
  Space,
  Select,
  Image,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  LockOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  changePassword,
  editProfile,
  getUserById,
} from "../../api/userService";
import { useTranslation } from "react-i18next";
import MyCard from "../../shared/my-card";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const Profile = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const [imageURL, setImageURL] = useState<string | null>(
    userData?.profile_picture
      ? `http://localhost:5000/api/profilePicture/${userData.profile_picture}`
      : null
  );

  const handleSave = async (values: {
    age: number;
    email: string;
    name: string;
    gender: string;
  }) => {
    console.log("values: ", values);
    setIsLoading(true);
    console.log("imageFile: ", !imageFile);
    console.log("imageURL: ", !imageURL);

    try {
      await editProfile({
        ...values,
        picture: imageFile,
      });

      const updatedUser = await getUserById();
      console.log("updatedUser: ", updatedUser);

      // ⬇️ Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ⬇️ Update form fields with the latest data
      form.setFieldsValue({
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        gender: updatedUser.gender,
      });

      // ⬇️ Update image preview if profile picture changed
      if (updatedUser.profile_picture) {
        setImageURL(
          `http://localhost:5000/api/profilePicture/${updatedUser.profile_picture}`
        );
      }
      console.log("updatedUser: ", updatedUser);

      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    await changePassword(values);
    setIsModalVisible(false);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files!");
      return false;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    return false;
  };

  const handleRemovePicture = () => {
    setImageURL(null);
    setAvatarUrl(null);
    setImageFile(null);
  };

  return (
    <MyCard
      styles={{
        maxWidth: 800,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Title style={{ color: "#fff" }} level={2}>
          {t("profilePage.title")}
        </Title>
        <Text style={{ color: "#fff" }} type="secondary">
          {t("profilePage.subTitle")}
        </Text>
        <Divider />
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          name: userData?.name,
          email: userData?.email,
          age: userData?.age,
          gender: userData?.gender,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
              gap: 10,
            }}
          >
            {imageURL ? (
              <Image
                src={imageURL}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "100px",
                  height: "100px",
                }}
                fallback="https://via.placeholder.com/100?text=No+Image"
              />
            ) : (
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
            )}
            <Upload showUploadList={false} beforeUpload={beforeUpload}>
              <Button icon={<UploadOutlined />} size="small" type="link">
                {t("profilePage.changeProfilePicture")}
              </Button>
            </Upload>
            {(!!imageURL || !!avatarUrl) && (
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={handleRemovePicture}
              >
                {t("profilePage.removePicture")}
              </Button>
            )}

            <Form.Item
              label={t("profilePage.gender")}
              name="gender"
              rules={[
                {
                  required: true,
                  message: t("profilePage.pleaseSelectGender"),
                },
              ]}
              style={{ paddingTop: imageURL ? 0 : 4, width: "90%" }}
            >
              <Select placeholder={t("profilePage.selectGender")}>
                <Select.Option value="Male">
                  {t("profilePage.male")}
                </Select.Option>
                <Select.Option value="Female">
                  {t("profilePage.female")}
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div style={{ width: "60%" }}>
            <Form.Item label={t("profilePage.email")} name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label={t("profilePage.name")}
              name="name"
              rules={[
                { required: true, message: t("profilePage.nameRequired") },
              ]}
            >
              <Input placeholder={t("profilePage.enterName")} />
            </Form.Item>
            <Form.Item
              label={t("profilePage.age")}
              name="age"
              rules={[
                { required: true, message: t("profilePage.ageRequired") },
                {
                  pattern: /^\d+$/,
                  message: "Age must be a number",
                },
              ]}
            >
              <Input placeholder={t("profilePage.enterAge")} />
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
              loading={isLoading}
            >
              {t("profilePage.saveChanges")}
            </Button>
            <Button
              icon={<LockOutlined />}
              block
              size="large"
              onClick={() => setIsModalVisible(true)}
            >
              {t("profilePage.changePassword")}
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title={t("profilePage.changePassword")}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            label={
              <label className="blackLabel">
                {t("profilePage.currentPassword")}
              </label>
            }
            name="currentPassword"
            rules={[
              {
                required: true,
                message: t("profilePage.currentPasswordRequired"),
              },
            ]}
          >
            <Input.Password
              placeholder={t("profilePage.enterCurrentPassword")}
            />
          </Form.Item>
          <Form.Item
            label={
              <label className="blackLabel">
                {t("profilePage.newPassword")}
              </label>
            }
            name="newPassword"
            rules={[
              { required: true, message: t("profilePage.newPasswordRequired") },
              {
                min: 8,
                message: t("RegisterSection.passwordMinLength"),
              },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: t("RegisterSection.passwordStrong"),
              },
            ]}
          >
            <Input.Password placeholder={t("profilePage.enterNewPassword")} />
          </Form.Item>
          <Form.Item
            label={
              <label className="blackLabel">
                {t("profilePage.confirmNewPassword")}
              </label>
            }
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: t("profilePage.confirmNewPasswordRequired"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("profilePage.passwordMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t("profilePage.confirmYourNewPassword")}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("profilePage.changePassword")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MyCard>
  );
};

export default Profile;
