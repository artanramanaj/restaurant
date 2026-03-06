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
        items: {
          "69a99d86d8a704713f4809cc": "Chicken Burger",
          "69a9a71ea504b4055f6cf02c": "Beef Burger",
          "69aacd7f683838f5b0d54251": "Margherita Pizza",
          "69aacd89683838f5b0d54253": "Tuna Pizza",
          "69aae9c92f6c0230bf89013b": "Cheese Burger",
          "69aae9d62f6c0230bf89013d": "Egg Burger",
          "69aae9df2f6c0230bf89013f": "Double Burger",
          "69aaea432f6c0230bf890141": "Margherita Pizza",
          "69aaea4b2f6c0230bf890143": "Pepperoni Pizza",
          "69aaea502f6c0230bf890145": "Homemade Pizza",
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
        hotDog: "hot-dog",
        hamburger: "hamburger",
        bread: "samun",
        sandwich: "sanduiç",
        salad: "sallatë",
      },
      products: {
        items: {
          "69a99d86d8a704713f4809cc": "Burger Pule",
          "69a9a71ea504b4055f6cf02c": "Burger Viçi",
          "69aacd7f683838f5b0d54251": "Pica Margherita",
          "69aacd89683838f5b0d54253": "Pica Tuna",
          "69aae9c92f6c0230bf89013b": "Burger Djathi",
          "69aae9d62f6c0230bf89013d": "Burger Vezë",
          "69aae9df2f6c0230bf89013f": "Burger Double",
          "69aaea432f6c0230bf890141": "Pica Margherita",
          "69aaea4b2f6c0230bf890143": "Pica Pepperoni",
          "69aaea502f6c0230bf890145": "Pica Shtëpie",
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
