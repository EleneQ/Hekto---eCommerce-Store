import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";

const getCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 100 } = req.query;

  //pagination
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);

  if (
    isNaN(parsedLimit) ||
    isNaN(parsedPage) ||
    parsedLimit <= 0 ||
    parsedPage <= 0
  ) {
    res.status(400).json({ message: "Invalid limit or page number provided" });
    return;
  }

  const startIndex = (parsedPage - 1) * parsedLimit;
  const categoryCount = await Category.countDocuments();

  const categories = await Category.find().limit(parsedLimit).skip(startIndex);

  res.json({
    categories,
    page: parsedPage,
    pages: Math.ceil(categoryCount / parsedLimit),
  });
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  const category = new Category({ name, image });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.image = image;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Category deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export { getCategories, deleteCategory, updateCategory, createCategory };
