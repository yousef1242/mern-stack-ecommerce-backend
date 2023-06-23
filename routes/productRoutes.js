const express = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const storage = require("../lib/multer");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  getProductsByGender,
  getProductsByCategory,
  deleteProductById,
  updateProductInfoNotImagesById,
  deleteAllProducts,
  getProductByGenderOrCategories,
} = require("../controllers/productController");

const router = express;

// add product
router.post(
  "/add-product",
  verifyToken,
  verifyTokenAndAdmin,
  storage.array("files"),
  addProduct
);

// delete product
router.delete("/delete/:productId", verifyToken, verifyTokenAndAdmin, deleteProductById);

// get all products
router.get("/", getAllProducts);

// get all products
router.get("/shop", getProductByGenderOrCategories);

// get single products
router.get("/:productId", getSingleProduct);


// delete all products
router.delete("/delete", deleteAllProducts);

// update product
router.put(
  "/update/:productId",
  verifyToken,
  verifyTokenAndAdmin,
  updateProductInfoNotImagesById
);

module.exports = router;
