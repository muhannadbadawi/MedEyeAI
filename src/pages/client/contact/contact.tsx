import { useTranslation } from "react-i18next";
import { Form, Input, Button, Card, Typography } from "antd";
import { sendEmailToAdmin } from "../../../api/userService";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const { t } = useTranslation();

  const onFinish = async (values: { message: string }) => {
    console.log("Form values:", values);
    try {
      const user = localStorage.getItem("user");
      const userData = user ? JSON.parse(user) : null;

      await sendEmailToAdmin({
        ...values,
        email: userData.email,
        name: userData.name,
      });
      // Optionally show a success message
    } catch (error) {
      console.error("Failed to send email:", error);
      // Optionally show an error message
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 50,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        textAlign: "center",
        padding: 24,
        background: "transparent",
        backdropFilter: "blur(10px)",
        margin: "0.5rem auto",
        border: "2px solid rgba(93, 143, 250, 0.6)",
      }}
    >
      <Title level={2}>{t("contact.title", "Contact Us")}</Title>
      <Paragraph>
        {t("contact.subtitle", "We'd love to hear from you!")}
      </Paragraph>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t("contact.message", "Message")}
          name="message"
          rules={[
            {
              required: true,
              message: t(
                "contact.messageRequired",
                "Please enter your message"
              ),
            },
          ]}
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
  );
};

export default Contact;
