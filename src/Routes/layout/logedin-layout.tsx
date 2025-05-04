import { Layout, Button, Space, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import englishFlag from "../../assets/flags/UK_flag_icon_round.svg";
import arabicFlag from "../../assets/flags/Jordan_flag_icon_round.svg";
import { changeLanguage } from "../../i18n/i18n";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const LogedinLayout = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const firstLetter = userData?.name.charAt(0).toUpperCase();
  
  const switchLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
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
            <Avatar style={{ backgroundColor: "#87d068" }}>{firstLetter}</Avatar>
            {userData.name}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {navigate("/home")}}>
            {t("LogedinLayout.home", "Home")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {}}>
            {t("LogedinLayout.profile", "Profile")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {}}>
            {t("LogedinLayout.contact", "Contact")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={logout}>
            {t("LogedinLayout.logout", "Logout")}
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
