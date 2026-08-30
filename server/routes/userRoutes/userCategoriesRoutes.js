const express = require("express");
const {
  userGetAllCategoriesController,
} = require("../../controllers/users/userGetAllCategoriesController");
const router = express.Router();

// categories route is start from here
router.get("/getAllCategories", userGetAllCategoriesController);
// categories route is end here

module.exports = router;
