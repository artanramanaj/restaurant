import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import albFlag from "@/assets/images/alb-flag.png";
import ukFlag from "@/assets/images/uk-flag.png";
const Navigation = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="flex flex-col justify-between gap-4 rounded-3xl bg-primary p-4 text-white md:flex-row">
      <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
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

      <div className="flex w-fit items-center rounded bg-white px-4 py-1">
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
