const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models/auth");
const bcrypt = require("bcrypt");

/***************************
  @Routes /api/auth/register
****************************/
const authRegisterCtr = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "Email is exsit" });
  }
  const userName = await User.findOne({ username: req.body.username });
  if (userName) {
    return res.status(400).json({ message: "Username is exsit" });
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });
  await newUser.save();
  return res.status(200).json({ message: "You registered in successfully" });
});

/***************************
  @Routes /api/auth/login
****************************/
const authLoginCtr = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Email isn't exsit" });
  }
  const comparePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!comparePassword) {
    return res.status(400).json({ message: "Password doesn't match" });
  }
  const token = user.generateVerifyToken();
  return res.status(200).json({
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    token: token,
  });
});

module.exports = {
  authLoginCtr,
  authRegisterCtr,
};
