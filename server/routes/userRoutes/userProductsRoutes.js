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

const {
  getSearchProductsController,
} = require("../../controllers/users/getSearchProductsController");
const {
  getSingleProductDetailController,
} = require("../../controllers/users/getSingleProductDetailController");

const router = express.Router();

// heroPageproducts routes is start from here
router.get("/getHeroSectionAllProducts", getHeroSectionAllProductsController);
router.get("/getAllFeaturedProducts", getAllFeaturedProductsController);
// heroPageproducts routes is end here

// AllproductsPage routes is start from here
router.get("/getAllProducts", getAllProductsController); // get initial only 10 to 20 products route
router.get("/searchProducts", getSearchProductsController); // search and get products route
// AllproductsPage routes is end here

// singleProductDetail route is start from here
router.get("/getSingleProductDetail/:id", getSingleProductDetailController); // get initial only 10 to 20 products route
// singleProductDetail route is end from here

module.exports = router;
