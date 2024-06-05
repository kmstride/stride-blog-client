import { rootApi } from "./apiSlice";

const blogApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    getAllPost: builder.query({
      query: ({ page, size }) => `/blog/all?page=${page}&size=${size}`,
      providesTags: ["post"],
    }),
    singlePostById: builder.query({
      query: (id) => `/blog/${id}`,
    }),
    postsByUser: builder.query({
      query: ({ page, size }) => `/blog/myPosts?page=${page}&size=${size}`,
      providesTags: ["post"]
    }),
    countPost: builder.query({
      query: () => "/blog/count",
    }),
    countPostByUser: builder.query({
      query: () => "/blog/myPostsCount",
    }),
    updatePostById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/blog/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
    searchPost: builder.mutation({
      query: (data) => ({
        url: `/blog/search`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["post"],
    }),
    authorPerformance: builder.query({
      query: () => "/blog/authorPerformance",
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostQuery,
  useSinglePostByIdQuery,
  useCountPostQuery,
  useCountPostByUserQuery,
  usePostsByUserQuery,
  useUpdatePostByIdMutation,
  useDeletePostMutation,
  useSearchPostMutation,
  useAuthorPerformanceQuery
} = blogApi;
