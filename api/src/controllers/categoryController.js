import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
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
