const express = require("express").Router();
const router = express;
const { addToCart, deleteFromCart, getAllCartForUser, deleteAllCartForUser, updateCartForQuantaty } = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/verifyToken");
const storage = require("../lib/multer")

// add to cart
router.post("/add-cart", verifyToken, addToCart);

// get all cart for user
router.get("/", verifyToken, getAllCartForUser);

// delete product from cart
router.delete("/delete/:cartId", verifyToken, deleteFromCart);

// delete all cart for user
router.delete("/delete-all-cart", verifyToken, deleteAllCartForUser);

// update cart 
router.put("/update/:cartId", verifyToken, updateCartForQuantaty);

module.exports = router;
