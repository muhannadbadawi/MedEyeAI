import { Layout, Button, Space, Avatar } from "antd";
import { useTranslation } from "react-i18next";
// import wallpaper from "../../assets/macro-eye-iris.jpg";
import englishFlag from "../../assets/flags/UK_flag_icon_round.svg";
import arabicFlag from "../../assets/flags/Jordan_flag_icon_round.svg";
// import { useState } from "react";
// import LoginSection from "./sections/login-section/login-section";
// import RegisterSection from "./sections/register-section/register-section";
// import ContactSection from "./sections/contact-section/contact-section";
// import MainSection from "./sections/main-section/main-section";
// import logo from "../../assets/new-logo.png";
import { changeLanguage } from "../../i18n/i18n";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const LogedinLayout = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const switchLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Top Bar */}
      <Header
        style={{
          background:
            i18n.language === "en"
              ? "linear-gradient(to left,#001529, rgb(19, 54, 87))"
              : "linear-gradient(to left,rgb(19, 54, 87),  #001529)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 rem",
          height: "10vh",
        }}
      >
        <Space>
          <Button
            type="link"
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {}}
          >
            <Avatar style={{ backgroundColor: "#87d068" }}>L</Avatar>
            Layan
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {navigate("/home")}}>
            {t("LangingPage.contacts", "Home")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {}}>
            {t("LangingPage.profile", "Profile")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {}}>
            {t("LangingPage.contact", "Contact")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {navigate("/")}}>
            {t("LangingPage.Logout", "Logout")}
          </Button>
        </Space>
        <Button type="text" onClick={switchLang} style={{ color: "#fff" }}>
          {/* Display flag based on current language */}
          <img
            src={i18n.language === "en" ? arabicFlag : englishFlag}
            alt="Language Flag"
            style={{ width: 35, height: 30, marginRight: 8 }}
          />
          {i18n.language === "en" ? "العربية" : "English"}
        </Button>
      </Header>

      {/* Page Content */}
      <Content>
        {children}
      </Content>
    </Layout>
  );
};
export default LogedinLayout;
