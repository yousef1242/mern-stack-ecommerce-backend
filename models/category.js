const mongoose = require("mongoose");

const categoryShcema = new mongoose.Schema(
    {
        title : String,
        gender : String,
    },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categoryShcema);

module.exports = {
  Categories,
};
