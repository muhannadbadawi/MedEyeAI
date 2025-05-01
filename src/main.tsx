import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import i18n from "./i18n/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider direction={i18n.language === 'en' ? "ltr": "rtl"}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
