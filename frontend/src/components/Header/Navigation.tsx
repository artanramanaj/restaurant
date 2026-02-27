import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import albFlag from "@/assets/images/alb-flag.png";
import ukFlag from "@/assets/images/uk-flag.png";
const Navigation = () => {
  const { t, i18n } = useTranslation();
  console.log("check the t", t);
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className=" flex justify-between gap-4 bg-primary rounded-lg p-4 text-white">
      <ul className="flex items-center gap-4">
        <li>
          <NavLink to="/">{t("nav.home")}</NavLink>
        </li>
        <li>
          <NavLink to="/about">{t("nav.about")}</NavLink>
        </li>
        <li>
          <NavLink to="/cart">{t("nav.cart")}</NavLink>
        </li>
        <li>
          <NavLink to="/jobs">{t("nav.jobs")}</NavLink>
        </li>
        <li>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
        </li>
      </ul>

      <div className="px-4 py-1 bg-white rounded flex items-center">
        {i18n.language === "en" ? (
          <button onClick={() => changeLanguage("sq")}>
            <img src={albFlag} alt="albanian" />
          </button>
        ) : (
          <button onClick={() => changeLanguage("en")}>
            <img src={ukFlag} alt="english" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
