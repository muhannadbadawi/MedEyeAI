import { useTranslation } from "react-i18next";
import { Form, Input, Button, Card, Typography } from "antd";
import { sendEmailToAdmin } from "../../../api/userService";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const { t } = useTranslation();

  const onFinish = async (values: {
    message: string;
  }) => {
    console.log("Form values:", values);
    try {
      const user = localStorage.getItem("user");
      const userData = user ? JSON.parse(user) : null;

      await sendEmailToAdmin({...values, email:userData.email , name: userData.name});
      // Optionally show a success message
    } catch (error) {
      console.error("Failed to send email:", error);
      // Optionally show an error message
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <Card style={{ width: "100%", maxWidth: 600 }}>
        <Title level={2}>{t("contact.title", "Contact Us")}</Title>
        <Paragraph>{t("contact.subtitle", "We'd love to hear from you!")}</Paragraph>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={t("contact.message", "Message")}
            name="message"
            rules={[{ required: true, message: t("contact.messageRequired", "Please enter your message") }]}
          >
            <Input.TextArea rows={8} />
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
