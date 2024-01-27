import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import randProductCode from "../utils/randProductCode.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
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

export { getProducts, getProductById, createProduct, updateProduct };
