import { apiSlice } from "./apiSlice";
type TotalUsersResponse = {
  total: number;
};
const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),
    getTotalUsers: builder.query<TotalUsersResponse, void>({
      query: () => `/users/total`,
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
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    verifyUser: builder.mutation({
      query: (userData) => ({
        url: "/users/verify",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetTotalUsersQuery,
  useAuthUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useVerifyUserMutation,
} = userApiSlice;
