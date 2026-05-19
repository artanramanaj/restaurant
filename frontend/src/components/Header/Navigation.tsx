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
    <nav className=" flex justify-between gap-4 bg-primary rounded-3xl p-4 text-white">
      <ul className="flex items-center gap-4">
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
            className="hover:opacity-90 transition-opacity"
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

      <div className="px-4 py-1 bg-white rounded flex items-center gap-2 text-primary">
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
