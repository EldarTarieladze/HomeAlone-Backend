const mongoose = require("mongoose");

const Properties = new mongoose.Schema({
  prop: {
    type: String,
  },
  value: {
    type: String,
  },
});

const Images = new mongoose.Schema({
  url: {
    type: String,
  },
});
const Products = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feature: {
    type: String,
    required: true,
  },
  properties: [Properties],
  mainImage: {
    type: String,
    required: true,
  },
  images: [Images],
});
const ProductSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  products: [Products],
});
module.exports = mongoose.model("products", ProductSchema);
