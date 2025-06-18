import { Layout, Button, Space, Avatar, Image } from "antd";
import { useTranslation } from "react-i18next";
import englishFlag from "../../assets/flags/UK_flag_icon_round.svg";
import arabicFlag from "../../assets/flags/Jordan_flag_icon_round.svg";
import { changeLanguage } from "../../i18n/i18n";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../enums/userRole";

const { Header, Content } = Layout;

const LogedinLayout = ({ role }: { role: UserRole }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const firstLetter = userData?.name?.charAt(0).toUpperCase();

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
        <Space size="small">
          <Button
            type="link"
            style={{
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            {userData?.profile_picture ? (
              <Image
                src={`http://localhost:5000/api/profilePicture/${userData.profile_picture}`}
                alt="Scan"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "40px",
                  height: "40px",
                }}
                preview={false}
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: "#1890ff",
                  marginRight: 8,
                  verticalAlign: "middle",
                }}
                size="large"
              >
                {firstLetter}
              </Avatar>
            )}

            {userData?.name}
          </Button>

          {/* Navigation Buttons */}
          {role === UserRole.Client ? (
            <>
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("home")}
              >
                {t("LogedinLayout.home", "Home")}
              </Button>
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("profile")}
              >
                {t("LogedinLayout.profile", "Profile")}
              </Button>
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("history")}
              >
                {t("LogedinLayout.history", "History")}
              </Button>
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("contact")}
              >
                {t("LogedinLayout.contact", "Contact")}
              </Button>
            </>
          ) : role === UserRole.Admin ? (
            <>
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("home")}
              >
                {t("LogedinLayout.home", "Home")}
              </Button>
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("users")}
              >
                {t("LogedinLayout.users", "Users")}
              </Button>
                            <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("recommendations-management")}
              >
                {t("LogedinLayout.recommendationsManagement", "Recommendations Management")}
              </Button>
              <Button
                type="link"
                style={{ color: "#fff" }}
                onClick={() => navigate("profile")}
              >
                {t("LogedinLayout.profile", "Profile")}
              </Button>
            </>
          ) : null}

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
      <Content
        style={{
          paddingTop: "10vh",
          background: `linear-gradient(135deg, #0F0C29, #1E5E98)`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LogedinLayout;
