import { MenuPanel, CartPanel } from "@/components/index";
const Order = () => {
  return (
    <div className="container flex flex-col-reverse gap-4 py-6 md:grid md:grid-cols-[2fr_1fr]">
      <MenuPanel /> <CartPanel />
    </div>
  );
};

export default Order;
