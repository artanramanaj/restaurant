import { useTranslation } from "react-i18next";
import { CartSvg } from "@/components/index";
const TopBar = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="container flex justify-end gap-4 py-2">
      <h4 className="text-primary border-r-2 pr-4">{t("topbar.heading")}</h4>
      <div className="flex items-center">
        <CartSvg />
        <h4 className="text-primary">42€</h4>
      </div>
    </div>
  );
};

export default TopBar;
