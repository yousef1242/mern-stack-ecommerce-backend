const mongoose = require("mongoose");

const productsShcema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: [String],
    category: {
      type: String,
    },
    gender: {
      type: String,
    },
    disCountPrecent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsShcema);

module.exports = {
  Products,
};
