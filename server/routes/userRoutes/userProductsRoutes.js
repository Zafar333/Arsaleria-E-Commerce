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
  getAllProductsCursorPaginationController,
} = require("../../controllers/users/userAllProductsController/getAllProductsCursorPaginationController");
const {
  getSelectedFilterProductsDataController,
} = require("../../controllers/users/userAllProductsController/getSelectedFilterProductsDataController");

const router = express.Router();

// heroPageproducts routes is start from here
router.get("/getHeroSectionAllProducts", getHeroSectionAllProductsController);
router.get("/getAllFeaturedProducts", getAllFeaturedProductsController);
// heroPageproducts routes is end here

// AllproductsPage routes is start from here

router.get("/getAllProducts", getAllProductsController); // get initial only 10 to 20 products route
router.get(
  "/getInfiniteScrollingProducts",
  getAllProductsCursorPaginationController,
); //get remainning products in chunks through cursor pagination route
router.get(
  "/getSelectedFilterProductsData",
  getSelectedFilterProductsDataController,
);

// AllproductsPage routes is end here

module.exports = router;
