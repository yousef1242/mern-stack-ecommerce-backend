const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authShcema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
},{timestamps : true});

authShcema.methods.generateVerifyToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", authShcema);

module.exports = {
  User,
};
