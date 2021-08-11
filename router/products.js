const router = require("express").Router();
const path = require("path");
const productSchema = require("./../schema/product");
router.route("/add").post(async (req, res) => {
  //   const dir = path.join(__dirname, "../../../../../var/www/");
  const name = req.body.data.name;
  const productIMG = req.body.data.productImg;
  const description = req.body.data.description;
  const features = req.body.data.feature;
  const thumbIMG = req.body.data.thumbImg;

  // Product Thumb image upload

  let thumbIGMURL = "";
  let base64Data = thumbIMG.replace(/^data:image\/\w+;base64,/, "");
  thumbIGMURL = `${name + "_main"}.${thumbIMG.split("/")[1].split(";")[0]}`;
  require("fs").writeFile(
    `${__dirname}/${name + "_main"}.${thumbIMG.split("/")[1].split(";")[0]}`,
    base64Data,
    "base64",
    function (err) {
      console.log(err);
    }
  );
  // Product image upload

  let imgARR = [];
  productIMG.map((IMGURL, i) => {
    let base64Data = IMGURL.replace(/^data:image\/\w+;base64,/, "");
    imgARR.push({
      url: `${name + i}.${IMGURL.split("/")[1].split(";")[0]}`,
    });
    require("fs").writeFile(
      `${__dirname}/${name + i}.${IMGURL.split("/")[1].split(";")[0]}`,
      base64Data,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  });
  const arr = features.split(";");
  let newarr = [];
  arr.map((it) => {
    newarr.push({
      prop: it.split(":")[0],
      value: it.split(":")[1],
    });
  });
  console.log(newarr);
  const obj = {
    name: "kaxi",
    description: "eldari",
    properties: newarr,
    mainImage: thumbIGMURL,
    images: imgARR,
  };
  let cond = "productType";
  let value = "video";
  let query = {};
  query[cond] = value;
  productSchema.findOne(query).then((re) => {
    console.log(re);
    re.products.push(obj);
    re.save();
  });

  res.json("success");
});
module.exports = router;
