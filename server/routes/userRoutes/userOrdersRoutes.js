const express = require("express");
const {
  userOrdersController,
} = require("../../controllers/users/userOrdersControllers/userOrdersController");
const {
  checkJwtToken,
} = require("../../middleware/userJwtTokens/checkJwtToken");
const router = express.Router();

router.post("/placeOrder", checkJwtToken, userOrdersController);

module.exports = router;
