import { PRODUCTS_URL, UPLOAD_URL } from "../constants/endpoints";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: PRODUCTS_URL,
        params: params,
      }),
      providesTags: ["Products"], //now there's no need to refresh the page
      keepUnusedDataFor: 5, //in seconds, how long the data's cached
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], //stop the product from being cached
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopRatedProducts: builder.query({
      query: (params) => ({
        url: `${PRODUCTS_URL}/top`,
        params: params,
      }),
      keepUnusedDataFor: 5,
    }),
    getFeaturedProducts: builder.query({
      query: (params) => ({
        url: `${PRODUCTS_URL}/featured`,
        params: params,
      }),
      keepUnusedDataFor: 5,
    }),
    getLatestProducts: builder.query({
      query: ({ selectedTab, limit }) => ({
        url: `${PRODUCTS_URL}/latest/${selectedTab}`,
        params: { limit },
      }),
      keepUnusedDataFor: 5,
    }),
    updateProductViews: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}/views`,
        method: "PUT",
      }),
      invalidatesTags: ["Products"],
    }),
    getTrendingProducts: builder.query({
      query: ({ limit }) => ({
        url: `${PRODUCTS_URL}/trending`,
        params: { limit },
      }),
      keepUnusedDataFor: 5,
    }),
    getDiscountedProducts: builder.query({
      query: (params) => ({
        url: `${PRODUCTS_URL}/discount`,
        params: params,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopRatedProductsQuery,
  useGetFeaturedProductsQuery,
  useGetLatestProductsQuery,
  useUpdateProductViewsMutation,
  useGetTrendingProductsQuery,
  useGetDiscountedProductsQuery,
} = productsApiSlice;
