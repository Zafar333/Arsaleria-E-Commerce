const express = require("express");

const {
  getAllFeaturedProductsController,
} = require("../../controllers/users/userHeroPageProductsConroller/getAllFeaturedProductsController");
const {
  getHeroSectionAllProductsController,
} = require("../../controllers/users/userHeroPageProductsConroller/getHeroSectionAllProductsController");

const router = express.Router();

// heroPageproducts routes is start from here
router.get("/getHeroSectionAllProducts", getHeroSectionAllProductsController);
router.get("/getAllFeaturedProducts", getAllFeaturedProductsController);
// heroPageproducts routes is end here

module.exports = router;
