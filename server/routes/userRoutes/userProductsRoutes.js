const express = require("express");
const {
  getHeroSectionAllProductsController,
} = require("../../controllers/users/getHeroSectionAllProductsController");

const router = express.Router();

// products routes is start from here
router.get("/getHeroSectionAllProducts", getHeroSectionAllProductsController);
// products routes is end here

module.exports = router;
