import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/endpoints";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

//parent of other api slices
export const apiSlice = createApi({
  baseQuery,
  //the types of fetched data
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: (builder) => ({}),
});
