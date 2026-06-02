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
      dropdown: {
        welcome: "Welcome",
        profile: "Profile",
        admin: "Admin",
        logout: "Logout",
      },
      auth: {
        login: "Login",
        register: "Register",
        logoutFailed: "Logout failed",
      },
      banner: {
        heading: "Good Food. Good Mood.",
        description:
          "Enjoy freshly prepared dishes made with quality ingredients and real care. Whether you’re here for a quick bite or a relaxed meal, we’re ready to serve food that brings people together.",
      },
    about: {
  storyButton: "Our Story",
  title: "A Taste of Tradition",
  description:
    "For years we have been serving our community with recipes passed down through generations. Every dish is prepared with fresh ingredients and the same passion that started our kitchen.",
  imageAlt: "Restaurant interior",
  content: {
    title: "The ZHURI Way",
    description:
      "At ZHURI, we believe that exceptional pizza is an art form that requires time, patience, and an uncompromising commitment to quality. Our journey begins with the dough.",
   
  },
  features: {
    dop: {
      title: "D.O.P. Certified",
      description:
        "We source only the finest D.O.P. ingredients directly from Italy. From the sun-ripened San Marzano tomatoes to the creamy Mozzarella di Bufala Campana.",
    },
    hours: {
      title: "48 Hours",
      description: "Slow fermentation process for the perfect crust.",
    },
  },
  values: {
  title: "Our Values",
  sustainability: {
    title: "Sustainability",
    description: "We are committed to eco-friendly practices, from sourcing local ingredients to reducing waste in everything we do.",
  },
  quality: {
    title: "Quality",
    description: "Every ingredient is carefully selected and every dish crafted to the highest standard, because you deserve nothing less.",
  },
  community: {
    title: "Community",
    description: "We are more than a restaurant — we are a gathering place where neighbors become friends and every meal tells a story.",
  },
},
},
contact: {
  title: "Contact Us",
  description:
    "Whether you have a question about our artisanal process, want to book a large party, or simply want to say ciao, we're here.",
  checkboxItems: {
    menu: "Questions about our menu or ingredients",
    reservations: "Reservations for large groups or events",
    feedback: "Feedback about your experience",
    partnership: "Partnership or catering inquiries",
  },
  form: {
    fullname: "Full Name",
    fullnamePlaceholder: "John Doe",
    mobile: "Mobile Number",
    mobilePlaceholder: "+1 000 000 0000",
    message: "Message",
    messagePlaceholder: "Write your message here...",
    submit: "Send Message",
  },
  details: {
    title: "The Details",
    locationTitle: "Roma Centrale",
    locationAddress: "Via della Vite, 14 \n 00187 Roma RM, Italy",
    phoneTitle: "Phone",
    phoneNumber: "+39 06 1234 5678",
    emailTitle: "Email",
    emailAddress: "ciao@rossomoderno.it",
  },
  hours: {
    title: "Service Hours",
    mondayThursday: "Monday - Thursday",
    mondayThursdayHours: "12:00 - 22:30",
    fridaySaturday: "Friday - Saturday",
    fridaySaturdayHours: "12:00 - 23:30",
    sunday: "Sunday",
    sundayHours: "13:00 - 22:00",
  },
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
      addToCartModal: {
        extraRequest: "Additional Request",
        extraRequestPlaceholder:
          "Tell us your preferences (e.g., no mustard)...",
        quantity: "Quantity",
        close: "Close",
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
      footer: {
        description:
          "Fresh flavors, quality ingredients, and warm hospitality — your neighborhood spot for pizza, doner, and more.",
        menu: "Menu",
        contact: "Contact",
        followUs: "Follow Us",
        socialHint: "Stay updated with our latest offers and news.",
        location: "Rruga Dëshmorët e Kombit, Tirana, Albania",
        phone: "+355 44 123 456",
        rights: "All rights reserved.",
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
      dropdown: {
        welcome: "Mirë se vini",
        profile: "Profili",
        admin: "Admin",
        logout: "Dilni",
      },
      auth: {
        login: "Hyrje",
        register: "Regjistrohu",
        logoutFailed: "Dalja dështoi",
      },
      banner: {
        heading: "Ushqim i Mirë. Humor i Mirë.",
        description:
          "Shijoni pjata të përgatitura të freskëta me përbërës cilësorë dhe kujdes të veçantë. Qoftë për një vakt të shpejtë apo për një darkë të qetë, jemi këtu për t’ju ofruar ushqim që bashkon njerëzit.",
      },
    about: {
  storyButton: "Historia Jonë",
  title: "Shija e Traditës",
  description:
    "Prej vitesh shërbejmë komunitetin tonë me receta të transmetuara brez pas brezi. Çdo pjatë përgatitet me përbërës të freskët dhe të njëjtin pasion që nisi kuzhinën tonë.",
  imageAlt: "Ambienti i restorantit",
  content: {
    title: "Mënyra ZHURI",
    description:
      "Tek ZHURI, besojmë se pica e jashtëzakonshme është një formë arti që kërkon kohë, durim dhe një përkushtim të palëkundur ndaj cilësisë. Udhëtimi ynë fillon me brumin.",
  },
  features: {
    dop: {
      title: "I Certifikuar D.O.P.",
      description:
        "Përdorim vetëm përbërësit më të mirë D.O.P. direkt nga Italia. Nga domatet San Marzano të pjekura në diell deri te Mozzarella di Bufala Campana kremoze.",
    },
    hours: {
      title: "48 Orë",
      description: "Procesi i fermentimit të ngadaltë për koren e përsosur.",
    },
  },
  values: {
  title: "Vlerat Tona",
  sustainability: {
    title: "Qëndrueshmëria",
    description: "Jemi të përkushtuar ndaj praktikave miqësore me mjedisin, nga burimet lokale deri te reduktimi i mbetjeve në gjithçka që bëjmë.",
  },
  quality: {
    title: "Cilësia",
    description: "Çdo përbërës zgjidhet me kujdes dhe çdo pjatë përgatitet sipas standardit më të lartë, sepse ju meritoni më të mirën.",
  },
  community: {
    title: "Komuniteti",
    description: "Ne jemi më shumë se një restorant — jemi një vend takimi ku fqinjët bëhen miq dhe çdo vakt tregon një histori.",
  },
},
},
contact: {
  title: "Na Kontaktoni",
  description:
    "Nëse keni një pyetje rreth procesit tonë artizanal, dëshironi të rezervoni për një grup të madh, ose thjesht dëshironi të thoni ciao, jemi këtu.",
  checkboxItems: {
    menu: "Pyetje rreth menusë ose përbërësve tanë",
    reservations: "Rezervime për grupe të mëdha ose ngjarje",
    feedback: "Komente rreth përvojës suaj",
    partnership: "Pyetje për partneritet ose katering",
  },
  form: {
    fullname: "Emri i Plotë",
    fullnamePlaceholder: "Agim Berisha",
    mobile: "Numri i Telefonit",
    mobilePlaceholder: "+383 00 000 000",
    message: "Mesazhi",
    messagePlaceholder: "Shkruani mesazhin tuaj këtu...",
    submit: "Dërgo Mesazhin",
  },
  details: {
    title: "Detajet",
    locationTitle: "Roma Centrale",
    locationAddress: "Via della Vite, 14 \n 00187 Roma RM, Itali",
    phoneTitle: "Telefoni",
    phoneNumber: "+39 06 1234 5678",
    emailTitle: "Email",
    emailAddress: "ciao@rossomoderno.it",
  },
  hours: {
    title: "Orët e Shërbimit",
    mondayThursday: "E Hënë - E Enjte",
    mondayThursdayHours: "12:00 - 22:30",
    fridaySaturday: "E Premte - E Shtunë",
    fridaySaturdayHours: "12:00 - 23:30",
    sunday: "E Diel",
    sundayHours: "13:00 - 22:00",
  },
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
      addToCartModal: {
        extraRequest: "Kërkesa Shtesë",
        extraRequestPlaceholder:
          "Na tregoni preferencat tuaja (p.sh., pa musterd)...",
        quantity: "Sasia",
        close: "Mbyll",
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
      footer: {
        description:
          "Shije të freskëta, përbërës cilësorë dhe mikpritje e ngrohtë — vendi juaj i preferuar për pica, doner dhe më shumë.",
        menu: "Menu",
        contact: "Kontakt",
        followUs: "Na Ndiqni",
        socialHint: "Qëndroni të informuar për ofertat dhe lajmet tona më të fundit.",
        location: "Rruga Dëshmorët e Kombit, Tiranë, Shqipëri",
        phone: "+355 44 123 456",
        rights: "Të gjitha të drejtat e rezervuara.",
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
