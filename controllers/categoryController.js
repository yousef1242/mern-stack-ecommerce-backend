const expressAsyncHandler = require("express-async-handler");
const { Categories } = require("../models/category");
const { Products } = require("../models/product");

/***************************
  @Routes /api/categories/add-category
****************************/
const addCategory = expressAsyncHandler(async (req, res) => {
  const category = new Categories(req.body);
  const newCategory = await category.save();
  res.status(200).json({ message: "Category has been created", newCategory });
});

/***************************
  @Routes /api/categories
****************************/
const getAllCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Categories.find({});
  res.status(200).json(categories);
});

/***************************
  @Routes /api/categories/men
****************************/
const getCategoriesForMen = expressAsyncHandler(async (req, res) => {
  const categories = await Categories.find({ gender: "men" });
  res.status(200).json(categories);
});

/***************************
  @Routes /api/categories/men
****************************/
const getCategoriesForWomen = expressAsyncHandler(async (req, res) => {
  const categories = await Categories.find({ gender: "women" });
  res.status(200).json(categories);
});

/***************************
  @Routes /api/categories/delete/categoryId
****************************/
const deleteCategory = expressAsyncHandler(async (req, res) => {
  const cat = await Categories.findByIdAndDelete(req.params.categoryId);
  await Products.deleteMany({ category: cat.title });
  res.status(200).json({ message: "Category has been deletes" });
});

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
  getCategoriesForMen,
  getCategoriesForWomen,
};
