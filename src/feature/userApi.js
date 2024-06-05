import { rootApi } from "./apiSlice";

const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (data) => ({
        url: "auth/upload",
        method: "PUT",
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: "auth/googleSignIn",
        method: "PUT",
        body: data,
      }),
    }),
    loggedIn: builder.query({
      query: () => "auth/loggedIn",
      providesTags: ["user"]
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"]
    }),
    changeUserPassword:builder.mutation({
      query: (data) => ({
        url: "auth/changePassword",
        method: "PUT",
        body: data,
      })
    }),
  }),
});

export const {
  useRegisterMutation,
  useUploadPhotoMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useLoggedInQuery,
  useUpdateUserMutation,
  useChangeUserPasswordMutation
} = userApi;
