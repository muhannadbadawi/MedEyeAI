import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { sendEmailToAdmin } from "../../../../api/userService";
import layan from "../../../../assets/team/layan4.jpeg";
import hala from "../../../../assets/team/hala.jpeg";
import amer from "../../../../assets/team/amer.jpeg";
import malek from "../../../../assets/team/malek.jpeg";

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
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const labelStyle = { color: "#fff" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "900px",
        margin: "0 auto",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div style={{ width: "40%" }}>
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
              <span style={labelStyle}>
                {t("ContactSection.email", "Email")}
              </span>
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
      <div style={{ width: "60%", paddingLeft: "20px" }}>
        <Title
          level={3}
          style={{ color: "#fff", textAlign: "center", marginBottom: 20 }}
        >
          {t("ContactSection.ourTeam", "Our Team")}
        </Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "30px",
            justifyItems: "center",
          }}
        >
          {[
            { src: layan, name: "Layan", discription: "Team Leader" },
            { src: hala, name: "Hala", discription: "Frontend Developer" },
            { src: amer, name: "Amer", discription: "Backend Developer" },
            { src: malek, name: "Malek", discription: "UI/UX Designer" },
          ].map((member, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "170px",
              }}
            >
              <img
                src={member.src}
                alt={member.name}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition:
                    member.name === "Hala" ? "center top" : "center",
                  marginBottom: 10,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
