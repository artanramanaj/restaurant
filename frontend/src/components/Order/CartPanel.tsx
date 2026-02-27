import { CartHeading, EmptyCart } from "@/components/index";
const CartPanel = () => {
  return (
    <section>
      <div className="mt-10 rounded-3xl border-2 border-primary p-3 shadow-lg lg:mt-0 lg:p-8">
        <CartHeading />
        <EmptyCart />
      </div>
    </section>
  );
};

export default CartPanel;
