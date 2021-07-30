const router = require("express").Router();
const productSchema = require("./../schema/product");
router.route("/product/:type").get(async (req, res) => {
  switch (req.params.type) {
    case "ic":
      res.send("ic");
      break;
    case "sl":
      res.send("sl");
      break;
    case "hs":
      res.send("hs");
      break;
    case "srt":
      res.send("srt");
      break;
    case "sh":
      res.send("sh");
      break;
    case "he":
      res.send("he");
      break;
    default:
      res.send("error");
      break;
  }
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
router.route("/addprod").get(async (req, res) => {
  // const product = new productSchema({
  //   productType: "video",
  // });
  // product.save();

  let x = "agwera:kariga;tvinish_sheryeva:true";
  const arr = x.split(";");
  let newarr = [];
  arr.map((it) => {
    newarr.push({
      prop: it.split(":")[0],
      value: it.split(":")[1],
    });
  });
  const obj = {
    name: "kaxi",
    feature: "eldari",
    properties: newarr,
    mainImage: "eldari",
  };

  productSchema.findOne({ productType: "video" }).then((re) => {
    re.products.push(obj);
    re.save().then((responss) => {
      const x = responss.products[responss.products.length - 1];
      productSchema.findOne({ productType: "video" }).then((result) => {
        result.products.map((item) => {
          console.log(item);
          console.log(x);
          if (item._id.toString() == x._id.toString()) {
            ["1", "2", "3", "4", "5", "6", "8", "9"].map((it) => {
              item.images.push({
                url: it,
              });
            });
          }
        });
        result.save();
      });
    });
  });
  res.json("success");
});
router.route("/getallprod").get(async (req, res) => {
  productSchema.find({}).then((result) => {
    res.json(result);
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
