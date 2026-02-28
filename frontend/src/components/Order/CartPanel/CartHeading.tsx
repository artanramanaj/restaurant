import React from "react";
import { CartSvg } from "@/components/index";
import { useTranslation } from "react-i18next";
const CartHeading = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between w-full">
      <h3>{t(`cart.heading`)}</h3>
      <CartSvg />
    </div>
  );
};

export default CartHeading;
