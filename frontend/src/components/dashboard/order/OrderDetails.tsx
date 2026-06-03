import { useGetOrderQuery } from "@/store/ordersApiSlice";
import { useState } from "react";
import { Spinner } from "@/components";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [tracked, setTracked] = useState(false);
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderQuery(id);

  if (isLoading) return <Spinner />;
  if (!order) return null;

  const {
    _id,
    createdAt,
    status,
    items,
    deliveryAddress,
    paymentMethod,
    totalPrice,
    orderType,
  } = order;

  const shortId = `#${_id.slice(-10).toUpperCase()}`;

  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const statusStyles: Record<string, string> = {
    pending: "text-red-700 border-red-100",
    completed: "text-green-700 border-green-100",
    cancelled: "text-neutral-500 border-neutral-200",
  };

  const statusDotStyles: Record<string, string> = {
    pending: "bg-red-600",
    completed: "bg-green-600",
    cancelled: "bg-neutral-400",
  };

  return (
    <div className="min-h-screen bg-stone-100 py-10 px-4 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-red-700 text-xs font-bold tracking-widest uppercase font-sans mb-1">
              Transaction Details
            </p>
            <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight mb-1">
              {shortId}
            </h1>
            <p className="text-sm text-neutral-400 font-sans">
              Placed on {formattedDate}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span
              className={`flex items-center gap-2 bg-white border rounded-full px-4 py-1.5 text-xs font-bold tracking-widest font-sans shadow-sm ${
                statusStyles[status] ?? statusStyles.pending
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full inline-block ${
                  statusDotStyles[status] ?? statusDotStyles.pending
                }`}
              />
              {status.toUpperCase()}
            </span>
            <button className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-base shadow-sm hover:bg-stone-50 transition-colors">
              🖨️
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-base font-bold text-neutral-800 mb-4">
              Order Items
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-4 mb-6">
              {items.map((item: any) => (
                <div
                  key={item._id ?? item.id}
                  className="flex gap-4 bg-white rounded-xl p-4 shadow-sm items-start"
                >
                  <div
                    className="bg-neutral-900 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl overflow-hidden"
                    style={{ width: 72, height: 72 }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "🍕"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-bold text-neutral-900">
                        {item.name}
                      </span>
                      <span className="text-base font-bold text-red-600  ml-2 flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-neutral-500 leading-relaxed mb-2 font-sans">
                        {item.description}
                      </p>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-stone-100 text-neutral-500 border border-stone-200 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide ">
                        QTY {item.qty}
                      </span>
                      <span className="bg-stone-100 text-neutral-500 border border-stone-200 rounded px-2 py-0.5 text-[10px] font-bold tracking-wide ">
                        ${item.price.toFixed(2)} each
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery & Payment */}
            <div className="grid grid-cols-2 gap-4">
              {/* Delivery Address */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">📍</span>
                  <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase ">
                    Delivery Address
                  </span>
                </div>
                {deliveryAddress?.phone && (
                  <p className="text-sm font-bold text-neutral-900 mb-1">
                    {deliveryAddress.phone}
                  </p>
                )}
                <p className="text-xs text-neutral-500  leading-relaxed">
                  {deliveryAddress?.street && (
                    <>
                      {deliveryAddress.street}
                      <br />
                    </>
                  )}
                  {deliveryAddress?.city}
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">💳</span>
                  <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                    Payment Method
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="bg-neutral-800 text-white rounded px-2.5 py-1 text-base font-black tracking-wider ">
                    {paymentMethod === "cash" ? "💵" : "💳"}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 capitalize">
                      {paymentMethod}
                    </p>
                    <p className="text-[11px] text-neutral-400  capitalize">
                      {orderType} order
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-neutral-900 mb-5">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3"></div>

              <div className="h-px bg-stone-100 my-5" />

              <div className="mb-5">
                <p className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-sans mb-1">
                  Total Payable
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-extrabold text-red-600 leading-none">
                    ${totalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-red-500 font-sans">
                    ✓ Verified
                  </span>
                </div>
              </div>

              <button
                onClick={() => setTracked(!tracked)}
                className={`w-full py-3.5 rounded-lg text-white text-xs font-bold tracking-widest uppercase font-sans mb-2.5 transition-colors duration-200 ${
                  tracked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {tracked ? "✓ ORDER TRACKED" : "TRACK LIVE ORDER →"}
              </button>

              <button className="w-full py-2 text-[11px] font-bold text-neutral-400 tracking-widest uppercase font-sans hover:text-neutral-600 transition-colors">
                Need Help With This Order?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
