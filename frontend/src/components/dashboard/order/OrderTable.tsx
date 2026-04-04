import { TableData } from "@/components";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "@/store/ordersApiSlice";

type OrderItem = {
  _id: string;
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  user?: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: string;
  status: string;
  orderType: string;
  deliveryAddress?: {
    street: string;
    city: string;
    phone: string;
  };
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  body: Order[];
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  delivered: "bg-green-500/20 text-green-400",
  taken: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const availableStatuses = [
  "pending",
  "confirmed",
  "delivered",
  "taken",
  "cancelled",
];

const OrderTable = ({ body }: Props) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateOrderStatus({ id, status }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-primary text-white uppercase text-sm tracking-wider">
            <th className="px-5 py-4 font-semibold whitespace-nowrap">ID</th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">Items</th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">Total</th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">Type</th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">
              Address
            </th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">
              Payment
            </th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">
              Status
            </th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">Date</th>
            <th className="px-5 py-4 font-semibold whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {body.map((order, index) => (
            <tr
              key={order._id}
              className={`
                border-b border-[#EB2327]/30 transition-colors duration-150
                ${index % 2 === 0 ? "bg-lightblack" : "bg-[#1a1a1a]/90"}
              `}
            >
              <TableData data={order?._id} />

              {/* Items */}
              <td className="px-5 py-3">
                <div className="flex flex-col gap-1">
                  {order.items.map((item) => (
                    <span key={item._id} className="text-gray-300 text-xs">
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </td>

              <TableData data={`${order?.totalPrice}€`} />

              {/* Order Type */}
              <td className="px-5 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${order.orderType === "delivery" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}
                >
                  {order.orderType}
                </span>
              </td>

              {/* Delivery Address */}
              <td className="px-5 py-3">
                {order.deliveryAddress ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-300 text-xs">
                      {order.deliveryAddress.street}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {order.deliveryAddress.city}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {order.deliveryAddress.phone}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-600 text-xs">—</span>
                )}
              </td>

              {/* Payment */}
              <td className="px-5 py-3">
                <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                  {order.paymentMethod}
                </span>
              </td>

              {/* Status */}
              <td className="px-5 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </td>

              <TableData
                data={new Date(order?.createdAt).toLocaleDateString()}
              />

              {/* Actions */}
              <td className="px-5 py-3">
                <select
                  defaultValue={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  disabled={
                    order.status === "delivered" ||
                    order.status === "taken" ||
                    order.status === "cancelled"
                  }
                  className="bg-[#242424] text-white text-xs border border-white/10 rounded-lg px-2 py-1.5 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {availableStatuses.map((s) => (
                    <option key={s} value={s} className="bg-[#242424]">
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {body.length === 0 && (
        <div className="text-center py-12 text-primary bg-lightblack">
          No orders found
        </div>
      )}
    </div>
  );
};

export default OrderTable;
