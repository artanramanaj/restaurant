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
        "hot-dog": "hot-dog",
        hamburger: "hamburger",
        bread: "bread",
        sandwich: "sandwich",
        salad: "salad",
      },
      products: {
        items: {
          "69b4215d32cd702331dd4b3f": "Chicken Cheese Burger",
          "69b41c5832cd702331dd4ade": "Burger Onion",
          "69b550ec296a99462ad28c72": "Doner on Plate",
          "69b550cc296a99462ad28c6d": "Doner in Bread",
          "69b55000296a99462ad28c5e": "Calzone",
          "69b54fac296a99462ad28c58": "Tuna Pizza",
          "69b54f86296a99462ad28c51": "Vegetarian Pizza",
          "69b54e95296a99462ad28c4c": "hot-dog",
          "69b54e84296a99462ad28c43": "toast",
          "69b54e45296a99462ad28c35": "Margherita Pizza",
          "69b54e27296a99462ad28c30": "Pepperoni Pizza",
          "69b54dd1296a99462ad28c2b": "Doner",
        },
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
        "hot-dog": "hot-dog",
        hamburger: "hamburger",
        bread: "samun",
        sandwich: "sanduiç",
        salad: "sallatë",
      },
      products: {
        items: {
          "69b4215d32cd702331dd4b3f": "Burger pule me djath",
          "69b41c5832cd702331dd4ade": "Burger me kep",
          "69b550ec296a99462ad28c72": "Doner në Pjatë",
          "69b550cc296a99462ad28c6d": "Doner në Bukë",
          "69b55000296a99462ad28c5e": "Kalzone",
          "69b54fac296a99462ad28c58": "Pizza Tuna",
          "69b54f86296a99462ad28c51": "Pizza Vegjetariane",
          "69b54e95296a99462ad28c4c": "Hot-dog",
          "69b54e84296a99462ad28c43": "Tost",
          "69b54e45296a99462ad28c35": "Pizza Margherita",
          "69b54e27296a99462ad28c30": "Pizza Peperoni",
          "69b54dd1296a99462ad28c2b": "Doner",
        },
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
