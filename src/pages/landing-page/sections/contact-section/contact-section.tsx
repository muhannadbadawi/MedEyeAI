import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { sendEmailToAdmin } from "../../../../api/userService";

const { Title } = Typography;

const ContactSection = () => {
  const { t } = useTranslation();

  const onFinish = async (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log("Form values:", values);
    try {
      await sendEmailToAdmin(values);
      // Optionally show a success message
    } catch (error) {
      console.error("Failed to send email:", error);
      // Optionally show an error message
    }
  };

  const labelStyle = { color: "#fff" };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", color: "#fff" }}>
        {t("ContactSection.contact", "Contact")}
      </Title>
      <Form
        name="contact-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label={
            <span style={labelStyle}>{t("ContactSection.name", "Name")}</span>
          }
          name="name"
          rules={[
            {
              required: true,
              message: t(
                "ContactSection.nameRequired",
                "Please input your name!"
              ),
            },
          ]}
        >
          <Input
            placeholder={t(
              "ContactSection.enterName",
              "Please enter your name"
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={labelStyle}>{t("ContactSection.email", "Email")}</span>
          }
          name="email"
          rules={[
            {
              required: true,
              message: t(
                "ContactSection.emailRequired",
                "Please input your email!"
              ),
            },
            {
              type: "email",
              message: t(
                "ContactSection.validEmail",
                "Please input a valid email!"
              ),
            },
          ]}
        >
          <Input
            placeholder={t(
              "ContactSection.enterEmail",
              "Please enter your email"
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={labelStyle}>
              {t("ContactSection.message", "Message")}
            </span>
          }
          name="message"
          rules={[
            {
              required: true,
              message: t(
                "ContactSection.messageRequired",
                "Please input your message!"
              ),
            },
          ]}
        >
          <Input.TextArea
            placeholder={t(
              "ContactSection.enterMessage",
              "Please enter your message"
            )}
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            {t("ContactSection.send", "Send")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactSection;
