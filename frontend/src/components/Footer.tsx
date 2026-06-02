import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import blacklogo from "@/assets/images/zhuriBlackLogo2.png";
import { goToCartSection } from "@/utils/scrollToCart";

const footerLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors hover:text-white ${
    isActive ? "font-semibold text-white" : "text-white/75"
  }`;

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const year = new Date().getFullYear();

  const menuItems = [
    { type: "link" as const, to: "/", label: t("nav.home") },
    { type: "link" as const, to: "/about", label: t("nav.about") },
    { type: "cart" as const, label: t("nav.cart") },
    { type: "link" as const, to: "/jobs", label: t("nav.jobs") },
    { type: "link" as const, to: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link to="/">
              <img
                className="h-auto w-auto max-w-2/3 object-contain"
                src={blacklogo}
                alt="Restaurant logo"
              />
            </Link>
          </div>

          {/* Menu */}
          <div>
            <h5 className="mb-4 text-base font-semibold uppercase tracking-wide text-white">
              {t("footer.menu")}
            </h5>
            <ul className="flex flex-col gap-2.5">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.type === "cart" ? (
                    <button
                      type="button"
                      onClick={() => goToCartSection(navigate, pathname)}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <NavLink to={item.to} className={footerLinkClass}>
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="mb-4 text-base font-semibold uppercase tracking-wide text-white">
              {t("footer.contact")}
            </h5>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <FaMapMarkerAlt className="text-sm" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-white/80">
                  {t("footer.location")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <FaPhone className="text-sm" aria-hidden />
                </span>
                <a
                  href={`tel:${t("footer.phone").replace(/\s/g, "")}`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {t("footer.phone")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h5 className="mb-4 text-base font-semibold uppercase tracking-wide text-white">
              {t("footer.followUs")}
            </h5>
            <p className="mb-4 text-sm text-white/75">{t("footer.socialHint")}</p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg transition-all hover:border-white/40 hover:bg-white/20 hover:scale-105"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg transition-all hover:border-white/40 hover:bg-white/20 hover:scale-105"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-sm text-white/70">
          © {year} Restaurant. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
