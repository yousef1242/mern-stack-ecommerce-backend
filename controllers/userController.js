const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models/auth");
const { Products } = require("../models/product");

/***************************
  @Routes /api/users
****************************/
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 }).select("-password");
  res.status(200).json(users);
});

/***************************
  @Routes /api/users/profile/:userName
****************************/
const getSingleUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.userName })
    .populate("wishlist")
    .select(["-password"]);
  res.status(200).json(user);
});

/***************************
  @Routes /api/users/profile/wishlist/:userId
****************************/
const getSingleUserForWishlist = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).populate("wishlist");
  res.status(200).json(user);
});

/***************************
  @Routes /api/users/delete-all
****************************/
const deleteAllUsers = expressAsyncHandler(async (req, res) => {
  await User.deleteMany();
  res.status(200).json({ message: "All uses have been deleted" });
});

/***************************
  @Routes /api/users/profile/update/:userId
****************************/
const updateSingleUserInfo = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "Email already is exsit" });
  }
  const userName = await User.findOne({ username: req.body.username });
  if (userName) {
    return res.status(400).json({ message: "Username already is exsit" });
  }
  const userUpdate = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(userUpdate);
});

/***************************
  @Routes /api/users/wishlist/:productId
****************************/
const addWishlistToUserProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { productId } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isWishlistAdd = user.wishlist.find(
    (wish) => wish.toString() === productId
  );
  if (isWishlistAdd) {
    let newUserWishlist = await User.findByIdAndUpdate(
      id,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate("wishlist");
    res.status(200).json(newUserWishlist);
  } else {
    let newUserWishlist = await User.findByIdAndUpdate(
      id,
      { $push: { wishlist: productId } },
      { new: true }
    ).populate("wishlist");
    res.status(200).json(newUserWishlist);
  }
});

module.exports = {
  getAllUsers,
  getSingleUserForWishlist,
  updateSingleUserInfo,
  addWishlistToUserProfile,
  deleteAllUsers,
  getSingleUser,
};
