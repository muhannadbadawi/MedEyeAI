import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json"; // English translations
import ar from "./ar.json"; // Arabic translations

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: localStorage.getItem("i18nextLng") ?? "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export const changeLanguage = (lng: "en" | "ar") => {
  localStorage.setItem("i18nextLng", lng); // Store the selected language in local storage
  i18n.changeLanguage(lng);
};
