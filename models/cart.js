const mongoose = require("mongoose");

const cartShcema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    imageProduct : {
      type : String,
    },
    nameProduct : {
      type : String,
    },
    priceProduct : {
      type : Number,
    },
    quantaty : {
        type :Number,
        default : 1
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartShcema);

module.exports = {
  Cart,
};
