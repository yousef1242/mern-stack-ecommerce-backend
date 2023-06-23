const express = require("express").Router();
const router = express;
const {
  addCategory,
  getAllCategories,
  deleteCategory,
  getCategoriesForMen,
  getCategoriesForWomen,
} = require("../controllers/categoryController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

// add category
router.post("/add-category", verifyToken, verifyTokenAndAdmin, addCategory);

// get all categories
router.get("/", getAllCategories);

// get all categories men
router.get("/men", getCategoriesForMen);

// get all categories women
router.get("/women", getCategoriesForWomen);

// delete all categories
router.delete("/delete/:categoryId", verifyToken, verifyTokenAndAdmin, deleteCategory);

module.exports = router;
