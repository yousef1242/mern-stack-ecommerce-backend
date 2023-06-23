const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");
const cors = require("cors");

const app = express();


dotenv.config();

app.use(express.json());

connectDb();

app.use(cors({
  origin : "https://mern-stack-ecommerce-frontend-git-main-yousef1242.vercel.app",
}))



// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));

app.use("/api/cart", require("./routes/cartRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));


app.listen(8080, () => {
  try {
    console.log(`server is running`);
  } catch (error) {
    console.log(error);
  }
});
