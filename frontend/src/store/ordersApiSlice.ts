import { apiSlice } from "./apiSlice";
type TotalCategoryResponse = {
  total: number;
};
const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params?: { limit?: number; page?: number }) => {
        if (!params) return "/orders";

        const { limit, page } = params;

        const query = new URLSearchParams();

        if (limit) query.append("limit", String(limit));
        if (page) query.append("page", String(page));

        return `/orders?${query.toString()}`;
      },
      providesTags: ["Order"],
    }),

    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Order"],
    }),
    getTotalOrders: builder.query<TotalCategoryResponse, void>({
      query: () => `/orders/total`,
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetTotalOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersApiSlice;
