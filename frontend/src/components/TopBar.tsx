import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { goToCartSection } from "@/utils/scrollToCart";

const TopBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { t } = useTranslation();
  const itemCount = items.length;
  const hasItems = itemCount > 0;

  return (
    <div className="border-b border-primary/15 bg-gradient-to-r from-extra-light-red/50 via-light-red to-extra-light-red/50">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs text-primary"
            aria-hidden
          >
            ✦
          </span>
          <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.22em]">
            {t("topbar.heading")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => goToCartSection(navigate, pathname)}
          className="group flex items-center gap-2.5 rounded-2xl border border-primary/15 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-white hover:shadow-md active:scale-[0.98]"
          aria-label={t("nav.cart")}
        >
          {hasItems && (
            <span className="hidden text-right sm:block">
              <span className="block text-[0.65rem] font-medium uppercase tracking-wide text-gray-500">
                {t("nav.cart")}
              </span>
              <span className="block text-sm font-bold leading-tight text-primary">
                €{totalPrice.toFixed(2)}
              </span>
            </span>
          )}

          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary transition-transform group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              aria-hidden
            >
              <path
                className="fill-white"
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              />
            </svg>
            {hasItems && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-secondary px-1 text-[0.65rem] font-bold text-white">
                {itemCount}
              </span>
            )}
          </span>

          {!hasItems && (
            <span className="text-sm font-medium text-lightblack/70 transition-colors group-hover:text-primary">
              {t("nav.cart")}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
