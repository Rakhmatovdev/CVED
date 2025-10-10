import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["ru", "uz"],
    fallbackLng: "ru",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    },
    backend: {
      loadPath: "/locales/{{lng}}.json"
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
