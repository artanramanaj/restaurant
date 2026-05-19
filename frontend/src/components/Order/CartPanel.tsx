import { CartHeading, EmptyCart, CartBody } from "@/components/index";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
const CartPanel = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  return (
    <section id="cart" className="scroll-mt-8">
      <div className="mt-10 rounded-3xl border border-primary/15 bg-light-red p-3 shadow-lg lg:mt-0 lg:p-8">
        <CartHeading />
        {items.length === 0 ? <EmptyCart /> : <CartBody />}
      </div>
    </section>
  );
};

export default CartPanel;
