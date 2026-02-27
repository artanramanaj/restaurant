import React from "react";
import box from "@/assets/images/box.png";
const EmptyCart = () => {
  return (
    <div className="my-20 flex flex-col items-center gap-4">
      <img src={box} alt="empty" />
      <p>Ska Produkte ne Shporte</p>
      <h5>Porosia Minimale 5 euro</h5>
    </div>
  );
};

export default EmptyCart;
