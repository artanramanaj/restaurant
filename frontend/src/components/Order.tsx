import { MenuPanel, CartPanel } from "@/components/index";
const Order = () => {
  return (
    <div className="container grid grid-cols-[2fr_1fr] py-8 gap-4">
      <MenuPanel /> <CartPanel />
    </div>
  );
};

export default Order;
