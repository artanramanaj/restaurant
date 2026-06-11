import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { clearCart } from "@/store/cartSlice";
import { useCreateOrderMutation } from "@/store/ordersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next"; // ← add

type FormValues = {
  orderType: "delivery" | "takeaway";
  street?: string;
  city?: string;
  phone?: string;
};

const Checkout = () => {
  const { t } = useTranslation(); // ← add
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      orderType: "takeaway",
      street: "",
      city: "",
      phone: "",
    },
  });

  const orderType = watch("orderType");
  const deliveryFee = orderType === "delivery" ? 2.5 : 0;

  const handlePlaceOrder = async (data: FormValues) => {
    try {
      await createOrder({
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        orderType: data.orderType,
        totalPrice: totalPrice + deliveryFee,
        ...(data.orderType === "delivery" && {
          deliveryAddress: {
            street: data.street,
            city: data.city,
            phone: data.phone,
          },
        }),
      }).unwrap();

      dispatch(clearCart());
      toast.success(t("checkout.orderSuccess"));
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || t("checkout.orderError"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlePlaceOrder)}
      className="min-h-screen bg-light-red py-12 px-4"
    >
      <input type="hidden" {...register("orderType")} />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {t("checkout.title")}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {t("checkout.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="flex flex-col gap-8">

            {/* 1. Order Type */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  {t("checkout.orderType.title")}
                </h2>
              </div>
              <div className="grid grid-cols-2 rounded-xl border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setValue("orderType", "delivery")}
                  className={`flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${orderType === "delivery" ? "bg-white text-primary border-b-2 border-primary" : "bg-gray-50 text-gray-400"}`}
                >
                  🚗 {t("checkout.orderType.delivery")}
                </button>
                <button
                  type="button"
                  onClick={() => setValue("orderType", "takeaway")}
                  className={`flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${orderType === "takeaway" ? "bg-white text-primary border-b-2 border-primary" : "bg-gray-50 text-gray-400"}`}
                >
                  🏠 {t("checkout.orderType.takeaway")}
                </button>
              </div>
            </div>

            {/* 2. Delivery Address */}
            {orderType === "delivery" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                    {t("checkout.deliveryAddress.title")}
                  </h2>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
                      {t("checkout.deliveryAddress.street")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("checkout.deliveryAddress.streetPlaceholder")}
                      {...register("street", { required: t("checkout.deliveryAddress.streetRequired") })}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-primary transition-colors"
                    />
                    {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
                        {t("checkout.deliveryAddress.city")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("checkout.deliveryAddress.cityPlaceholder")}
                        {...register("city", { required: t("checkout.deliveryAddress.cityRequired") })}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-primary transition-colors"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
                        {t("checkout.deliveryAddress.phone")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("checkout.deliveryAddress.phonePlaceholder")}
                        {...register("phone", { required: t("checkout.deliveryAddress.phoneRequired") })}
                        className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-primary transition-colors"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {orderType === "delivery" ? "3" : "2"}
                </span>
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  {t("checkout.payment.title")}
                </h2>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">💵</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t("checkout.payment.method")}</p>
                    <p className="text-xs text-gray-400">{t("checkout.payment.description")}</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">{t("checkout.summary.title")}</h2>
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary border border-primary/30 px-2 py-1 rounded-full">
                {t("checkout.summary.status")}
              </span>
            </div>

            <div className="max-h-screen overflow-y-auto custom-scrollbar flex flex-col gap-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img src={`${item.image}`} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-gray-100" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{t("checkout.summary.subtotal")}</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              {orderType === "delivery" && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{t("checkout.summary.deliveryFee")}</span>
                  <span>€{deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-gray-900 mt-2">
                <span>{t("checkout.summary.total")}</span>
                <span className="text-primary text-xl">€{(totalPrice + deliveryFee).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || items.length === 0}
              className="w-full bg-primary hover:opacity-90 active:scale-[0.98] disabled:opacity-50 text-white font-bold py-4 rounded-xl text-sm tracking-widest uppercase transition-all"
            >
              {isLoading ? t("checkout.summary.placing") : t("checkout.summary.placeOrder")}
            </button>

            <p className="text-center text-xs text-gray-400 mt-3">
              {t("checkout.summary.terms")}{" "}
              <span className="text-primary underline cursor-pointer">{t("checkout.summary.termsLink")}</span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;