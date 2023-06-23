const express = require("express").Router();
const {
  addOrderForUser,
  paymentOrderApi,
  getUserOrders,
  deleteAllOrders,
  getSingleUserOrder,
  getAllOrders,
  cancelOrder,
} = require("../controllers/orderController");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = express;

// add new order for user
router.post("/new-order", verifyToken, addOrderForUser);

// add new order for user
router.post("/payment", paymentOrderApi);

// get all orders
router.get("/", verifyToken, verifyTokenAndAdmin, getAllOrders);

// cancel order
router.put("/cancel/:orderId", verifyToken, verifyTokenAndAdmin, cancelOrder);

// get orders for user
router.get("/:userId", verifyToken, getUserOrders);

// get single order
router.get("/single/:orderId", getSingleUserOrder);


// add new order for user
router.delete("/delete", verifyToken, verifyTokenAndAdmin, deleteAllOrders);

module.exports = router;
