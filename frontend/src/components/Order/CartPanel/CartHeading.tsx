import React from "react";
import { CartSvg } from "@/components/index";
const CartHeading = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <h3>Porosia e juaj</h3>
      <CartSvg />
    </div>
  );
};

export default CartHeading;
