import { useTranslation } from "react-i18next";
import { Form, Input, Button, Typography } from "antd";
import { sendEmailToAdmin } from "../../../api/userService";
import MyCard from "../../../shared/my-card";

const { Title, Paragraph } = Typography;

const Contact = () => {
  const { t } = useTranslation();

  const onFinish = async (values: { message: string }) => {
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
    <MyCard
      styles={{
        maxWidth: 460,
      }}
    >
      <Title style={{ color: "#fff" }} level={2}>
        {t("contact.title", "Contact Us")}
      </Title>
      <Paragraph style={{ color: "#fff" }}>
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
    </MyCard>
  );
};

export default Contact;
