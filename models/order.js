const mongoose = require("mongoose");

const orderShcema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    Governorate: {
      // المحافظة
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    wayForPayment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderShcema);

module.exports = {
  Order,
};
