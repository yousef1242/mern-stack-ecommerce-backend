const expressAsyncHandler = require("express-async-handler");
const { Cart } = require("../models/cart");
const cloudinary = require("../lib/cloudinary")

/***************************
  @Routes /api/cart/add-cart
****************************/
const addToCart = expressAsyncHandler(async (req, res) => {
    const cart = new Cart({
        user : req.user.id,
        product : req.body.product,
        quantaty : req.body.quantaty,
        nameProduct : req.body.nameProduct,
        imageProduct : req.body.imageProduct,
        priceProduct : req.body.priceProduct,
    });
    const newCart = await cart.save();
    res.status(200).json({message : "Product has been added to cart"})
});


/***************************
  @Routes /api/cart
****************************/
const getAllCartForUser = expressAsyncHandler(async (req, res) => {
    const cart = await Cart.find({user : req.user.id}).populate("product");
    res.status(200).json(cart);
});


/***************************
  @Routes /api/cart/add-cart
****************************/
const deleteFromCart = expressAsyncHandler(async (req, res) => {
    const cart = await Cart.findByIdAndDelete(req.params.cartId);
    if (!cart) {
        res.status(500).json({message : "It not found"})
    }
    res.status(200).json({message : "Product has been deleted from cart"})
});


/***************************
  @Routes /api/cart/delete-all-cart
****************************/
const deleteAllCartForUser = expressAsyncHandler(async (req, res) => {
    await Cart.deleteMany({user : req.user.id});
    res.status(200).json({message : "Cart has been deleted"});
});


/***************************
  @Routes /api/cart/update
****************************/
const updateCartForQuantaty = expressAsyncHandler(async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.cartId,{
      $set : {
        quantaty : req.body.quantaty
      }
    },{new : true})
    res.status(200).json(cart);
});

module.exports = {
  addToCart,
  getAllCartForUser,
  deleteFromCart,
  deleteAllCartForUser,
  updateCartForQuantaty,
};
