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
      {/* Header */}
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background:
            i18n.language === "en"
              ? "linear-gradient(to left,#001529, rgb(19, 54, 87))"
              : "linear-gradient(to left,rgb(19, 54, 87), #001529)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          height: "10vh",
        }}
      >
        {/* Left Section */}
        <Space size="large">
          <Button
            type="link"
            style={{
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {}}
          >
            <Avatar
              style={{
                backgroundColor: "#1890ff",
                marginRight: 8,
                verticalAlign: "middle",
              }}
              size="small"
            >
              {firstLetter}
            </Avatar>
            {userData?.name}
          </Button>

          <Button type="link" style={{ color: "#fff" }} onClick={() => navigate("/home")}>
            {t("LogedinLayout.home", "Home")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => navigate("/profile")}>
            {t("LogedinLayout.profile", "Profile")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => navigate("/history")}>
            {t("LogedinLayout.history", "History")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={() => {}}>
            {t("LogedinLayout.contact", "Contact")}
          </Button>
          <Button type="link" style={{ color: "#fff" }} onClick={logout}>
            {t("LogedinLayout.logout", "Logout")}
          </Button>
        </Space>

        {/* Language Switch */}
        <Button
          type="text"
          onClick={switchLang}
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "1rem",
            padding: 0,
            border: "none",
          }}
        >
          <img
            src={i18n.language === "en" ? arabicFlag : englishFlag}
            alt="Lang"
            style={{ width: 30, height: 30 }}
          />
          {i18n.language === "en" ? "العربية" : "English"}
        </Button>
      </Header>

      {/* Content */}
      <Content style={{ paddingTop: "10vh" }}>{children}</Content>
    </Layout>
  );
};

export default LogedinLayout;
