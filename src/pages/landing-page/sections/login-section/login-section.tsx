import { Form, Input, Button, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../api/authService";
import toast from "react-hot-toast";

const { Title } = Typography;

const LoginSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      const user = await login(email, password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        toast.error("Invalid email or password", { position: "bottom-center" });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password", { position: "bottom-center" });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          position: "bottom-center",
        });

        // throw new Error("Something went wrong. Please try again later.");
      }
    }
    //  catch {
    //   toast.error("Login failed. Please try again.", { position: "bottom-center" });
    // }
  };

  const labelStyle = { color: "#fff" };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#fff" }}>
        {t("LoginSection.login", "Login")}
      </Title>
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label={
            <span style={labelStyle}>{t("LoginSection.email", "Email")}</span>
          }
          name="email"
          rules={[
            {
              required: true,
              message: t(
                "LoginSection.emailRequired",
                "Please input your email!"
              ),
            },
            {
              type: "email",
              message: t(
                "LoginSection.validEmail",
                "Please input a valid email!"
              ),
            },
          ]}
        >
          <Input
            placeholder={t(
              "LoginSection.enterEmail",
              "Please enter your email"
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={labelStyle}>
              {t("LoginSection.password", "Password")}
            </span>
          }
          name="password"
          rules={[
            {
              required: true,
              message: t(
                "LoginSection.passwordRequired",
                "Please input your password!"
              ),
            },
          ]}
        >
          <Input.Password
            placeholder={t(
              "LoginSection.enterPassword",
              "Please enter your password"
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            style={{ padding: 0, color: "#1890ff" }}
            onClick={() => {
              /* Handle forgot password logic */
            }}
          >
            {t("LoginSection.forgotPassword", "Forgot Password?")}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            {t("LoginSection.login", "Login")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginSection;
