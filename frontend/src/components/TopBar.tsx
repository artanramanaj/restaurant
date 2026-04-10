import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CartSvg } from "@/components/index";
const TopBar = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-light-red">
      <div className="container flex justify-end gap-4 py-2">
        <h4 className="text-primary border-r-2 pr-4">{t("topbar.heading")}</h4>
        <div className="flex items-center gap-2">
          {items.length > 0 && <h4 className="text-primary">{totalPrice}€</h4>}

          <div className="relative">
            <CartSvg />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
