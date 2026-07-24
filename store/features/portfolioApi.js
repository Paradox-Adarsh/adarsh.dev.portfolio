import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Project", "Skill", "Contact"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/me/login",
        method: "POST",
        body,
      }),
    }),

    createSkillUnderCategory: builder.mutation({
      query: ({ categoryId, skill }) => ({
        url: `/skills/category/${categoryId}`,
        method: "POST",
        body: skill,
      }),
      invalidatesTags: ["Skill"],
    }),

       getProjects: builder.query({
            query: () => '/projects',
            providesTags: ['Project']
        }),

    getSkillCategoriesGrouped: builder.query({
      query: () => "/skill-categories/grouped",
      providedTags: ["Skill"],
    }),
  }),
});

export const {
  useGetSkillCategoriesGroupedQuery,
  useLoginMutation,
  useCreateSkillUnderCategoryMutation,
  useGetProjectsQuery,
} = portfolioApi;
