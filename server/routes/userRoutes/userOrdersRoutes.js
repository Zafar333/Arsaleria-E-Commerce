const express = require("express");
const {
  userOrdersController,
} = require("../../controllers/users/userOrdersControllers/userOrdersController");
const {
  checkJwtToken,
} = require("../../middleware/userJwtTokens/checkJwtToken");
const {
  userMultipleProductsOrderController,
} = require("../../controllers/users/userOrdersControllers/userMultipleProductsOrderController");
const router = express.Router();

router.post("/singleProductPlaceOrder", checkJwtToken, userOrdersController);
router.post(
  "/multipleProductsPlaceOrder",
  checkJwtToken,
  userMultipleProductsOrderController,
);

module.exports = router;
