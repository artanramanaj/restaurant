import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, category, page, limit }) =>
        `/products?search=${search}&category=${category}&page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } =
  productsApiSlice;
