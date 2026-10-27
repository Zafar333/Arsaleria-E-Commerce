const express = require("express");
const userAuthRoutes = require("./userAuthRoutes");
const userProductsRoutes = require("./userProductsRoutes");
const userHomeCrouselRoutes = require("./userHomeCrouselRoutes");
const userCategoriesRoutes = require("./userCategoriesRoutes");
const userOrdersRoutes = require("./userOrdersRoutes");

const router = express.Router();

router.use("/auth", userAuthRoutes);
router.use("/products", userProductsRoutes);
router.use("/categories", userCategoriesRoutes);
router.use("/carouselImgs", userHomeCrouselRoutes);
router.use("/order", userOrdersRoutes);

module.exports = router;
