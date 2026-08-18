const express = require("express");
const userAuthRoutes = require("./userAuthRoutes");
const userProductsRoutes = require("./userProductsRoutes");

const router = express.Router();

router.use("/auth", userAuthRoutes);
router.use("/products", userProductsRoutes);

module.exports = router;
