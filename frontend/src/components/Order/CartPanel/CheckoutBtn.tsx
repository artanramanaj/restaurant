import { useNavigate } from "react-router-dom";

const CheckoutBtn = () => {
  const navigate = useNavigate();
  const navigateToCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="w-full">
      <button
        className="w-full flex-1 flex items-center justify-center gap-2 bg-primary text-white rounded-full py-4 font-semibold text-lg hover:opacity-85 transition-all"
        onClick={navigateToCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutBtn;
