const express = require("express");
const userAuthRoutes = require("./userAuthRoutes");

const router = express.Router();

router.use("/auth", userAuthRoutes);

module.exports = router;
