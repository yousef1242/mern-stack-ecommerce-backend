const expressAsyncHandler = require("express-async-handler");
const { Products } = require("../models/product");
const { Order } = require("../models/order");
const cloudinary = require("../lib/cloudinary");

/***************************
  @Routes /api/products/add-product
****************************/
const addProduct = expressAsyncHandler(async (req, res) => {
  const product = new Products(req.body);
  const imageDevice = [];
  for (let i = 0; i < req.files.length; i++) {
    const result = await cloudinary.uploader.upload(req.files[i].path, {
      resource_type: "auto",
    });
    imageDevice.push(result.secure_url);
  }
  if (req.body.imageUrls) {
    const imageUrls = Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls
      : [req.body.imageUrls];
    for (const imageUrl of imageUrls) {
      const parsedUrl = new URL(imageUrl);
      parsedUrl.searchParams.delete("resize");
      parsedUrl.searchParams.delete("ssl");
      const cleanedUrl = parsedUrl.toString();
      imageDevice.push(cleanedUrl);
    }
  }
  product.images = imageDevice;
  const saveProduct = await product.save();
  res.status(200).json({ message: "Product has been created", saveProduct });
});
/***************************
  @Routes /api/products
****************************/
const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Products.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
});
/***************************
  @Routes /api/products/shop?=:anything
****************************/
const getProductByGenderOrCategories = expressAsyncHandler(async (req, res) => {
  const { gender, category } = req.query;
  const query = {};

  // If the 'shop' parameter is present in the query string, add it to the search query
  if (gender) {
    query.gender = gender;
  }

  // If the 'category' parameter is present in the query string, add it to the search query
  if (category) {
    query.category = category;
  }

  const products = await Products.find(query).sort({ createdAt: -1 });
  res.status(200).json(products);
});

/***************************
  @Routes /api/products/productId
****************************/
const getSingleProduct = expressAsyncHandler(async (req, res) => {
  const product = await Products.findOne({ name: req.params.productId });
  res.status(200).json(product);
});

/***************************
  @Routes /api/products/delete/:productId
****************************/
const deleteProductById = expressAsyncHandler(async (req, res) => {
  await Products.findByIdAndDelete(req.params.productId, { new: true });
  // Find all orders containing this product
  const orders = await Order.find({
    "products.product": req.params.productId,
  });

  // Delete all found orders
  for (let order of orders) {
    await Order.findByIdAndDelete(order._id, { new: true });
  }
  res.status(200).json({ message: "Product has been deleted" });
});

/***************************
  @Routes /api/products/delete/:productId
****************************/
const deleteAllProducts = expressAsyncHandler(async (req, res) => {
  await Products.deleteMany();
  res.status(200).json({ message: "Products have been deleted" });
});

/***************************
  @Routes /api/products/update/:productId
****************************/
const updateProductInfoNotImagesById = expressAsyncHandler(async (req, res) => {
  const product = await Products.findOneAndUpdate(
    { name: req.params.productName },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        disCountPrecent: req.body.disCountPrecent,
        category: req.body.category,
        gender: req.body.gender,
      },
    },
    { new: true }
  );

  res.status(200).json({ message: "Product has been updated" });
});

module.exports = {
  addProduct,
  getAllProducts,
  getProductByGenderOrCategories,
  getSingleProduct,
  deleteProductById,
  updateProductInfoNotImagesById,
  deleteAllProducts,
};
