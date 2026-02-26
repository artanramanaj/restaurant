import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

      <div>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("sq")}>SQ</button>
      </div>
    </nav>
  );
};

export default Navigation;
