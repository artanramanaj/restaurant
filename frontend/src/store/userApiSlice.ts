import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),
    authUser: builder.mutation({
      query: (userData) => ({
        url: "/users/auth",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUserQuery, useAuthUserMutation } = userApiSlice;
