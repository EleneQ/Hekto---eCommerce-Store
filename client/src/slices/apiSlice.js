import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

//parent of other api slices
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"], //the types of fetched data
  endpoints: (builder) => ({}),
});
