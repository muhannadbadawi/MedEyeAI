import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { register, login } from "../../../../api/authService";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const RegisterSection = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    await register(values);
    await login(values.email, values.password, navigate);
    setIsLoading(false);
  };

  const labelStyle = { color: "#fff" };

  return (
    <div
      style={{ width: "500px", margin: "0 auto", padding: "0 20px 20px 20px" }}
    >
      <Title level={2} style={{ textAlign: "center", color: "#fff" }}>
        {t("RegisterSection.register")}
      </Title>
      <Form
        name="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label={<span style={labelStyle}>{t("RegisterSection.name")}</span>}
          name="name"
          rules={[
            { required: true, message: t("RegisterSection.nameRequired") },
          ]}
        >
          <Input placeholder={t("RegisterSection.enterName")} />
        </Form.Item>

        <Form.Item
          label={<span style={labelStyle}>{t("RegisterSection.email")}</span>}
          name="email"
          rules={[
            { required: true, message: t("RegisterSection.emailRequired") },
            { type: "email", message: t("RegisterSection.validEmail") },
          ]}
        >
          <Input placeholder={t("RegisterSection.enterEmail")} />
        </Form.Item>

        <Form.Item
          label={
            <span style={labelStyle}>{t("RegisterSection.password")}</span>
          }
          name="password"
          rules={[
            { required: true, message: t("RegisterSection.passwordRequired") },
          ]}
        >
          <Input.Password placeholder={t("RegisterSection.enterPassword")} />
        </Form.Item>

        <Form.Item
          label={
            <span style={labelStyle}>
              {t("RegisterSection.confirmPassword")}
            </span>
          }
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t("RegisterSection.confirmPasswordRequired"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("RegisterSection.passwordMatch"))
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={t("RegisterSection.confirmPasswordPlaceholder")}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            {t("RegisterSection.register")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterSection;
