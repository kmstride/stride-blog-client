import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi= createApi({
    reducerPath: "rootApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://stride-blog-backend.onrender.com/api/v1`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token?.payload;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["post", "user"],
    endpoints: (builder) => ({})
});
