import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      topbar: {
        heading: "delicious, quality",
      },
      nav: {
        home: "Home",
        about: "About",
        cart: "Cart",
        jobs: "Jobs",
        contact: "Contact",
      },
      banner: {
        heading: "Good Food. Good Mood.",
        description:
          "Enjoy freshly prepared dishes made with quality ingredients and real care. Whether you’re here for a quick bite or a relaxed meal, we’re ready to serve food that brings people together.",
      },
      productSearch: {
        search: "Search Product ...",
      },
      categories: {
        all: "all",
        pizza: "pizza",
        doner: "doner",
        toast: "toast",
        hotDog: "hot-dog",
        hamburger: "hamburger",
        bread: "bread",
        sandwich: "sandwich",
        salad: "salad",
      },
      products: {
        1: { productName: "Pepperoni Pizza" },
        2: { productName: "Ham Pizza" },
        3: { productName: "Doner Classic" },
        4: { productName: "Doner Special" },
        5: { productName: "Doner Box" },
        6: { productName: "Tost Classic" },
        7: { productName: "Tost Special" },
        8: { productName: "Tost Ham & Cheese" },
        9: { productName: "Margherita Pizza" },
        10: { productName: "BBQ Pizza" },
        11: { productName: "Doner Wrap" },
        12: { productName: "Tost Veggie" },
        addToCart: "Add to cart",
      },
      cart: {
        heading: "Your Order",
        noProducts: "No products in cart !",
        minimum: "Minimum order 5 euros",
      },
    },
  },
  sq: {
    translation: {
      topbar: {
        heading: "shije, cilesi",
      },
      nav: {
        home: "Kryefaqja",
        about: "Rreth Nesh",
        cart: "Shporta",
        jobs: "Punë",
        contact: "Kontakt",
      },
      banner: {
        heading: "Ushqim i Mirë. Humor i Mirë.",
        description:
          "Shijoni pjata të përgatitura të freskëta me përbërës cilësorë dhe kujdes të veçantë. Qoftë për një vakt të shpejtë apo për një darkë të qetë, jemi këtu për t’ju ofruar ushqim që bashkon njerëzit.",
      },
      productSearch: {
        search: "Kërko produktin...",
      },
      categories: {
        all: "të gjitha",
        pizza: "pica",
        doner: "doner",
        toast: "tost",
        hotDog: "hot-dog",
        hamburger: "hamburger",
        bread: "samun",
        sandwich: "sanduiç",
        salad: "sallatë",
      },
      products: {
        1: { productName: "Pica Pepperoni" },
        2: { productName: "Pica me Proshutë" },
        3: { productName: "Doner Klasik" },
        4: { productName: "Doner Special" },
        5: { productName: "Doner Kuti" },
        6: { productName: "Tost Klasik" },
        7: { productName: "Tost Special" },
        8: { productName: "Tost Proshutë & Djathë" },
        9: { productName: "Pica Margherita" },
        10: { productName: "Pica BBQ" },
        11: { productName: "Doner Wrap" },
        12: { productName: "Tost Perime" },
        addToCart: "Shto në shportë",
      },
      cart: {
        heading: "Porosia juaj",
        noProducts: "Ska Produkte në Shportë",
        minimum: "Porosia minimale 5 euro",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "sq",
  fallbackLng: "sq",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
