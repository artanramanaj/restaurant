import { apiSlice } from "./apiSlice";
type Category = {
  _id: string;
  name: string;
};
const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
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
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
  categoriesApiSlice;
