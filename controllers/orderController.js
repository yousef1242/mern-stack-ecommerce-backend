const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const expressAsyncHandler = require("express-async-handler");
const { Order } = require("../models/order");

/***************************
  @Routes /api/orders/new-order
****************************/
const addOrderForUser = expressAsyncHandler(async (req, res) => {
  const order = new Order(req.body);
  if (req.body.productId || req.body.quantaties) {
    for (
      let i = 0, q = 0;
      i < req.body.productId.length && q < req.body.quantaties.length;
      i++, q++
    ) {
      const product = req.body.productId[i];
      const quantity = req.body.quantaties[q];
      order.products.push({ product, quantity });
    }
  }
  const newOrder = await order.save();
  res.status(200).json({ message: "Order has been placed!" });
});

/***************************
  @Routes /api/orders/:userId
****************************/
const getUserOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.userId })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "products.product",
      model: "Products",
    });
  res.status(200).json(orders);
});

/***************************
  @Routes /api/orders
****************************/
const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "products.product",
      model: "Products",
    });
  res.status(200).json(orders);
});

/***************************
  @Routes /api/orders/cancel/:orderId
****************************/
const cancelOrder = expressAsyncHandler(async (req, res) => {
  await Order.findByIdAndUpdate(
    req.params.orderId,
    {
      $set: {
        isCanceled: true,
      },
    },
    { new: true }
  );
  const books = await Order.find({})
    .populate({
      path: "products.product",
      model: "Products",
    })
    .sort({ createdAt: -1 });
  res.status(200).json(books);
});

/***************************
  @Routes /api/orders/:orderId
****************************/
const getSingleUserOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate({
    path: "products.product",
    model: "Products",
  });
  res.status(200).json(order);
});

/***************************
  @Routes /api/orders/delete
****************************/
const deleteAllOrders = expressAsyncHandler(async (req, res) => {
  await Order.deleteMany();
  res.status(200).json({ message: "Orders have been deleted" });
});

/***************************
  @Routes /api/orders/payment
****************************/
const paymentOrderApi = expressAsyncHandler(async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "egp",
    });
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addOrderForUser,
  cancelOrder,
  paymentOrderApi,
  getUserOrders,
  getSingleUserOrder,
  deleteAllOrders,
  getAllOrders,
};
