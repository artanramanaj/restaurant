import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { goToCartSection } from "@/utils/scrollToCart";

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
          <button
            type="button"
            onClick={() => goToCartSection(navigate, pathname)}
            className="transition-opacity hover:opacity-90"
          >
            {t("nav.cart")}
          </button>
        </li>
        <li>
          <NavLink to="/jobs">{t("nav.jobs")}</NavLink>
        </li>
        <li>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
        </li>
      </ul>

      <div className="flex w-fit items-center gap-2 rounded bg-white px-4 py-1 text-primary">
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={i18n.language === "en" ? "font-bold" : "opacity-60"}
        >
          eng
        </button>
        <span className="opacity-40">|</span>
        <button
          type="button"
          onClick={() => changeLanguage("sq")}
          className={i18n.language.startsWith("sq") ? "font-bold" : "opacity-60"}
        >
          sq
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
