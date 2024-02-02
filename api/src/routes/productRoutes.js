import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopRatedProducts,
  getFeaturedProducts,
  getLatestProducts,
  getTrendingProducts,
  updateProductViewsById,
  getDiscountedProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import blockInDevelopment from "../middleware/preventInDevelopment.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopRatedProducts);
router.get("/featured", getFeaturedProducts);
router.get("/latest/:tab", getLatestProducts);
router.get("/trending", getTrendingProducts);
router.get("/discount", getDiscountedProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/views").put(blockInDevelopment, updateProductViewsById);
router.route("/:id/reviews").post(protect, admin, createProductReview);

export default router;
