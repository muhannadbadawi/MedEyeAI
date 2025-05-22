import { Form, Input, Button, Typography, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../../api/authService";
import { resetPassword, sendOtp } from "../../../../api/userService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { UserRole } from "../../../../enums/userRole";

const { Title } = Typography;

const LoginSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openForgotPasswordModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setStep("email");
    setEmail("");
    setOtp(null);
  };

  const onSendOtp = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await sendOtp(email);
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("OTP sent successfully!");
        setOtp(response.data.otp); // Assuming the OTP is returned
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      setIsLoading(true);
      const response = await login(email, password);

      const user = (response as { user: any }).user;
      setIsLoading(false);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if(user.role === UserRole.Client)
          navigate("client/home");
        else
          navigate("admin/home")
      } else {
        toast.error("Invalid email or password", { position: "bottom-center" });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        toast.error("Invalid email or password", { position: "bottom-center" });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          position: "bottom-center",
        });
      }
      setIsLoading(false);
    }
  };

  const labelStyle = { color: "#fff" };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#fff" }}>
        {t("LoginSection.login", "Login")}
      </Title>

      <Form
        name="login-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
            placeholder={t("LoginSection.enterEmail", "Enter your email")}
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
            placeholder={t("LoginSection.enterPassword", "Enter your password")}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            style={{ padding: 0, color: "#1890ff" }}
            onClick={openForgotPasswordModal}
          >
            {t("LoginSection.forgotPassword", "Forgot Password?")}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            {t("LoginSection.login", "Login")}
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title={t("LoginSection.resetPassword", "Reset Password")}
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        {step === "email" && (
          <Form
            layout="vertical"
            onFinish={(values) => {
              setEmail(values.email);
              onSendOtp(values.email);
              setStep("otp");
            }}
          >
            <Form.Item
              label={t("LoginSection.email", "Email")}
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
                placeholder={t("LoginSection.enterEmail", "Enter your email")}
                autoFocus
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                {t("LoginSection.sendOtp", "Send OTP")}
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === "otp" && (
          <Form
            layout="vertical"
            onFinish={(values) => {
              if (values.otp === otp) {
                toast.success("OTP verified successfully!");
                setStep("reset");
              } else {
                toast.error("Invalid OTP. Please try again.");
              }
            }}
          >
            <Form.Item
              label={t("LoginSection.otp", "OTP")}
              name="otp"
              rules={[
                {
                  required: true,
                  message: t("LoginSection.otpRequired", "Please input OTP!"),
                },
              ]}
            >
              <Input
                placeholder={t("LoginSection.enterOtp", "Enter your OTP")}
                autoFocus
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t("LoginSection.verifyOtp", "Verify OTP")}
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === "reset" && (
          <Form
            layout="vertical"
            onFinish={async (values) => {
              try {
                await resetPassword(email, values.newPassword);
                toast.success("Password reset successful!");
                handleModalCancel();
              } catch {
                toast.error("Failed to reset password. Please try again.");
              }
            }}
          >
            <Form.Item
              label={t("LoginSection.newPassword", "New Password")}
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: t(
                    "LoginSection.passwordRequired",
                    "Please input your new password!"
                  ),
                },
              ]}
            >
              <Input.Password
                placeholder={t(
                  "LoginSection.enterNewPassword",
                  "Enter new password"
                )}
                autoFocus
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {t("LoginSection.resetPasswordBtn", "Reset Password")}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default LoginSection;
