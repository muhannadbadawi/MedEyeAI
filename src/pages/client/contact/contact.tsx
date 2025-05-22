import { useTranslation } from "react-i18next";
import { Form, Input, Button, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log("Submitted:", values);
    // You can replace this with actual API submission logic
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <Card style={{ width: "100%", maxWidth: 600 }}>
        <Title level={2}>{t("contact.title", "Contact Us")}</Title>
        <Paragraph>{t("contact.subtitle", "We'd love to hear from you!")}</Paragraph>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={t("contact.name", "Name")}
            name="name"
            rules={[{ required: true, message: t("contact.nameRequired", "Please enter your name") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("contact.email", "Email")}
            name="email"
            rules={[
              { required: true, message: t("contact.emailRequired", "Please enter your email") },
              { type: "email", message: t("contact.emailInvalid", "Please enter a valid email") },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("contact.message", "Message")}
            name="message"
            rules={[{ required: true, message: t("contact.messageRequired", "Please enter your message") }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("contact.submit", "Submit")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact;
