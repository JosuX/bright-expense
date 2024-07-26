import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenses = createApi({
  reducerPath: "expenses",
  baseQuery: fetchBaseQuery({
    baseUrl: "/expenses",
  }),
  endpoints: (builder) => ({
    getAllExpenses: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetAllExpensesQuery } = expenses;