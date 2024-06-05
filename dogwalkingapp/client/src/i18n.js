// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationHI from "./locales/hi/translation.json";
import translationPU from "./locales/pu/translation.json";
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  hi: {
    translation: translationHI,
  },
  pu: {
    translation: translationPU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // set default language
    fallbackLng: "en", // fallback language if translation not found
    interpolation: {
      escapeValue: false, // not needed for react
    },
  });

export default i18n;
