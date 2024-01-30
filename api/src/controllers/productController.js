import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import randProductCode from "../utils/randProductCode.js";
import {
  buildFilterCriteria,
  buildSortCriteria,
} from "../utils/filterSortProducts.js";

const getProducts = asyncHandler(async (req, res) => {
  const {
    keyword = "",
    page = 1,
    limit = 100,
    sort = "",
    rating = 0,
    brands = "",
    discount = 0,
    colors = "",
  } = req.query;

  //filtering and sorting
  const filterCriteria = buildFilterCriteria({
    keyword,
    rating,
    discount,
    brands,
    colors,
  });

  const sortCriteria = sort ? buildSortCriteria(sort) : {};

  //pagination
  const pageSize = parseInt(limit);
  const startIndex = (page - 1) * pageSize;
  const productCount = await Product.countDocuments(filterCriteria);

  //response
  const products = await Product.find(filterCriteria)
    .sort(sortCriteria)
    .limit(pageSize)
    .skip(startIndex);

  res.json({
    products,
    page: parseInt(page),
    pages: Math.ceil(productCount / pageSize),
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200);
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "Sample name",
    image: "/productImages/sample.png",
    code: randProductCode(),
    price: 0,
    colors: [{ colorName: "white", value: "#fff" }],
    brands: ["Sample Brand"],
    categories: ["sample", "category"],
    countInStock: 0,
    desc: "Sample description",
    featured: false,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    colors,
    brands,
    categories,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.desc = description;
    product.image = image;
    product.colors = colors;
    product.brands = brands;
    product.categories = categories;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You've already reviewed this produt");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Reviewed sccessfully" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  if (products) {
    res.status(200);
    return res.json(products);
  } else {
    res.status(404);
    throw new Error("Resouce not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopRatedProducts,
};
