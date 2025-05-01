import { Button } from "antd";
import { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface IMainSectionProps {
  onGetStarted: (
    value: SetStateAction<"none" | "login" | "register" | "contact">
  ) => void;
}
const MainSection = ({ onGetStarted }: IMainSectionProps) => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#fff" }}>
      <h2>{t("MainScreen.title", "Welcome to MedEyaAI")}</h2>
      <p>{t("MainScreen.description", "Your partner in eye care")}</p>
      <p>
        {t(
          "MainScreen.description2",
          "We are here to help you with your eye care needs."
        )}
      </p>

      <Button
        type="primary"
        block
        style={{ marginTop: "1rem" }}
        onClick={() => {
          onGetStarted("login");
        }}
      >
        {t("MainScreen.getStarted", "Get Started")}
      </Button>
    </div>
  );
};
export default MainSection;
