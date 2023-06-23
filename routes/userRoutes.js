const {
  getAllUsers,
  getSingleUser,
  updateSingleUserInfo,
  addWishlistToUserProfile,
  deleteAllUsers,
  getSingleUserForWishlist,
} = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const express = require("express").Router();
const router = express;

// get all users
router.get("/", verifyToken, verifyTokenAndAdmin, getAllUsers);

// get single user for wishlist
router.get("/profile/wishlist/:userId", verifyToken, getSingleUserForWishlist);

// get single user
router.get("/profile/:userName", verifyToken, getSingleUser);

// update single user info
router.put("/profile/update/:userId", verifyToken, updateSingleUserInfo);

// update single user info
router.put("/wishlist", verifyToken, addWishlistToUserProfile);

// delete all users
router.delete("/delete-all", verifyToken, verifyTokenAndAdmin, deleteAllUsers);

module.exports = router;
