const cloudinary = require("../../../configFiles/cloudinaryCloudConfig");
const { randomUUID } = require("crypto");
require("dotenv").config();

const adminGeneratePreSignedUrlHomeCarouselImgController = async (req, res) => {
  try {
    const productId = randomUUID();
    const timestamp = Math.round(new Date().getTime() / 1000);
    let folder = `DairyFarmMedia/homeCrouselImgs/file${productId}`;

    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },
      process.env.CLOUDINARY_API_SECRET,
    );
    // console.log("signature", signature);
    if (signature) {
      return res.json({
        status: 200,
        timestamp,
        signature,
        folder,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      });
    }
    if (!signature) {
      return res.json({ status: 500, message: "server error" });
    }
  } catch (error) {
    console.log(
      "adminGeneratePreSignedUrlAddProductController",
      error?.message,
    );
    return res.json({ status: 500, message: "server error" });
  }
};
module.exports = { adminGeneratePreSignedUrlHomeCarouselImgController };
