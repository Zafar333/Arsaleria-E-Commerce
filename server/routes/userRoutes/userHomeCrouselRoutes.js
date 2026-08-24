const express = require("express");
const {
  getAllImgsCrouselController,
} = require("../../controllers/users/getAllImgsCrouselController");

const router = express.Router();

// products routes is start from here
router.get("/getAllHeroCarouselImgs", getAllImgsCrouselController);
// products routes is end here

module.exports = router;
