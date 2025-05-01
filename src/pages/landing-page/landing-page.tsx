import { Layout, Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import wallpaper from "../../assets/macro-eye-iris.jpg";
import englishFlag from "../../assets/flags/UK_flag_icon_round.svg";
import arabicFlag from "../../assets/flags/Jordan_flag_icon_round.svg";
import { useState } from "react";
import LoginSection from "./sections/login-section/login-section";
import RegisterSection from "./sections/register-section/register-section";
import ContactSection from "./sections/contact-section/contact-section";
import MainSection from "./sections/main-section/main-section";
import logo from "../../assets/new-logo.png";

const { Header, Content } = Layout;

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [currentSection, setCurrentSection] = useState<
    "login" | "register" | "contact" | "none"
  >("none");

  const switchLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
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
          padding: "0 2rem",
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
            }}
            onClick={() => setCurrentSection("none")}
          >
            <img src={logo} alt="Logo" style={{ width: 50, height: 50 }} />
            MedEyeAI
          </Button>
          <Button
            type="link"
            style={{ color: "#fff" }}
            onClick={() => setCurrentSection("login")}
          >
            {t("LangingPage.login", "Login")}
          </Button>
          <Button
            type="link"
            style={{ color: "#fff" }}
            onClick={() => setCurrentSection("register")}
          >
            {t("LangingPage.register", "Register")}
          </Button>
          <Button
            type="link"
            style={{ color: "#fff" }}
            onClick={() => setCurrentSection("contact")}
          >
            {t("LangingPage.contact", "Contact")}
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
      <Content
        style={{
          background: `url(${wallpaper}) no-repeat center center`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            background:
              i18n.language === "en"
                ? "linear-gradient(to left,#001529, rgb(19, 54, 87))"
                : "linear-gradient(to left,rgb(19, 54, 87),  #001529)",
            borderRadius: "10px",
            width: "400px",
            maxWidth: "90%",
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.15)",
            maxHeight: "80vh",
            color: "#fff",
          }}
        >
          {currentSection === "login" && <LoginSection />}

          {currentSection === "register" && <RegisterSection />}

          {currentSection === "contact" && <ContactSection />}

          {currentSection === "none" && (
            <MainSection onGetStarted={setCurrentSection} />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;
