const { authRegisterCtr, authLoginCtr } = require("../controllers/authController");

const express = require("express").Router();
const router = express;


// register
router.post("/register",authRegisterCtr);

// login
router.post("/login",authLoginCtr);

module.exports = router;