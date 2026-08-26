const express = require("express");

const {
  getAllFeaturedProductsController,
} = require("../../controllers/users/userHeroPageProductsConroller/getAllFeaturedProductsController");
const {
  getHeroSectionAllProductsController,
} = require("../../controllers/users/userHeroPageProductsConroller/getHeroSectionAllProductsController");
const {
  getAllProductsController,
} = require("../../controllers/users/userAllProductsController/getAllProductsController");

const router = express.Router();

// heroPageproducts routes is start from here
router.get("/getHeroSectionAllProducts", getHeroSectionAllProductsController);
router.get("/getAllFeaturedProducts", getAllFeaturedProductsController);
// heroPageproducts routes is end here

// AllproductsPage routes is start from here
router.get("/getAllProducts", getAllProductsController);

// AllproductsPage routes is end here

module.exports = router;
