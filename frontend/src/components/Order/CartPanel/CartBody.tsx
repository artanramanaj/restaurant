import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { CheckoutBtn, TotalPrice } from "@/components";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/cartSlice";

const CartBody = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <div className="my-20 flex flex-col items-center gap-4 container">
      {/* Scrollable items list */}
      <div className="w-full max-h-screen overflow-y-auto flex flex-col gap-4 pr-1 custom-scrollbar ">
        {items.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="w-full flex flex-col justify-center items-center bg-extra-light-red border border-primary/20 rounded-2xl p-4 gap-4 relative"
            >
              <div className="flex-1 flex flex-col gap-1 justify-center items-center">
                <img
                  src={`${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 rounded-full object-cover border border-primary/20"
                />
                <h4 className="text-white font-semibold !text-lightblack text-center">
                  {item.name}
                </h4>
                <p className="text-center">
                  <span className="text-primary !text-[18px] font-bold">
                    {item.price}€
                  </span>{" "}
                  x{" "}
                  <span className="text-primary !text-[18px] font-bold">
                    {item.quantity}{" "}
                  </span>
                  ={" "}
                  <span className="text-primary !text-[18px] !font-bold">
                    {item.price * item.quantity}€
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item._id))}
                  className="w-8 h-8 rounded-full border-2 border-primary text-primary font-bold text-lg flex items-center justify-center hover:opacity-75 transition-opacity"
                >
                  −
                </button>
                <span className="text-lightblack !font-bold w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQuantity(item._id))}
                  className="w-8 h-8 rounded-full border-2 border-primary bg-primary text-white font-bold text-lg flex items-center justify-center hover:opacity-75 transition-opacity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="absolute top-1 right-1 w-8 h-8 rounded-full bg-primary/20 hover:bg-primary text-primary hover:text-white font-bold text-sm flex items-center justify-center transition-all"
              >
                X
              </button>
            </div>
          ))
        )}
      </div>

      <TotalPrice totalPrice={totalPrice} />
      <CheckoutBtn />
    </div>
  );
};

export default CartBody;
