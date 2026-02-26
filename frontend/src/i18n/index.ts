import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        cart: "Cart",
        jobs: "Jobs",
        contact: "Contact",
      },
    },
  },
  sq: {
    translation: {
      nav: {
        home: "Kryefaqja",
        about: "Rreth Nesh",
        cart: "Shporta",
        jobs: "Punë",
        contact: "Kontakt",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
