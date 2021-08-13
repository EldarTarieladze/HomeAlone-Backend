const router = require("express").Router();
const productSchema = require("./../schema/product");
const prodTypeSchema = require("./../schema/productType");
router.route("/product").get(async (req, res) => {
  productSchema.findOne({ productType: "video" }).then((r) => {
    if (r) {
      console.log("eldari");
    } else {
      console.log("jano");
    }
  });
  res.json("asdad");
});
router.route("/deleteprod/:type/:id").get(async (req, res) => {
  await productSchema.findOneAndUpdate(
    { productType: req.params.type },
    { $pull: { products: { _id: req.params.id } } },
    { new: true },
    function (err) {
      if (err) {
        console.log(err);
      } else res.json("success");
    }
  );
});
router.route("/addprodtype/:id").get(async (req, res) => {
  prodTypeSchema.findOne({}).then((result) => {
    result.prodType.push(req.params.id);
    result.save();
  });
  res.json("success");
});
router.route("/getallprodtype").get(async (req, res) => {
  prodTypeSchema.findOne({}).then((result) => {
    res.json({ success: true, data: result.prodType });
  });
});
router.route("/getallprod").get(async (req, res) => {
  let products = [];
  productSchema.find({}).then((result) => {
    result.map((item) => {
      products = [...products, item.products];
    });
    res.json(products);
  });
});
router.route("/getconcrettypeprod/:type").get(async (req, res) => {
  productSchema.find({ productType: req.params.type }).then((result) => {
    res.json(result);
  });
});
router.route("/getconcretprod/:type/:id").get(async (req, res) => {
  productSchema.findOne({ productType: req.params.type }).then((result) => {
    console.log(result);
    result.products.map((prod) => {
      if (prod._id.toString() == req.params.id.toString()) {
        res.json(prod);
      }
    });
  });
});
module.exports = router;
