import { apiSlice } from "./apiSlice";
type TotalProductResponse = {
  total: number;
};
type Product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, category, page, limit }) =>
        `/products?search=${search}&category=${category}&page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    getProductsAdmin: builder.query({
      query: ({ page, limit }) => `/products?&page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    getTotalProducts: builder.query<TotalProductResponse, void>({
      query: () => `/products/total`,
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

export const {
  useGetProductsQuery,
  useGetProductsAdminQuery,
  useGetTotalProductsQuery,
  useCreateProductMutation,
} = productsApiSlice;
