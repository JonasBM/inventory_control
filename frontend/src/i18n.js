import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { i18nextPlugin } from "translation-check";
import { initReactI18next } from "react-i18next";

const fallbackLng = ["en"];
const availableLanguages = ["en", "pt-br"];

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(i18nextPlugin)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: fallbackLng,
    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    saveMissing: false, // send not translated keys to endpoint
  });
export default i18n;
