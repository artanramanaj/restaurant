import { apiSlice } from "./apiSlice";
type TotalCategoryResponse = {
  total: number;
};
type Category = {
  _id: string;
  name: string;
};
const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params?: { limit?: number; page?: number }) => {
        if (!params) return "/categories";

        const { limit, page } = params;

        const query = new URLSearchParams();

        if (limit) query.append("limit", String(limit));
        if (page) query.append("page", String(page));

        return `/categories?${query.toString()}`;
      },
      providesTags: ["Category"],
    }),
    getTotalCategories: builder.query<TotalCategoryResponse, void>({
      query: () => `/categories/total`,
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, newProduct }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: newProduct,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetTotalCategoriesQuery,
  useGetCategoryQuery,
} = categoriesApiSlice;
