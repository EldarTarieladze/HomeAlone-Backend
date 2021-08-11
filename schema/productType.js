const mongoose = require("mongoose");
const Products = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});
const prodtype = new mongoose.Schema({
  products: [Products],
});
module.exports = mongoose.model("prodtype", prodtype);
