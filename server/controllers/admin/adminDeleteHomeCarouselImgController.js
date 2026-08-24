const { pool } = require("../../database/db");
const cloudinary = require("../../configFiles/cloudinaryCloudConfig");

const adminDeleteHomeCarouselImgController = async (req, res) => {
  try {
    if (!req?.query || Object.keys(req?.query)?.length == 0) {
      return res.send({ status: 500, message: "invalid request" });
    }
    const { productid, mediaid } = req?.query;
    const result = await pool.query(
      `DELETE FROM homecarousel_media WHERE id=$1`,
      [productid],
    );
    // console.log(result);
    if (result?.rowCount == 0) {
      return res.json({ status: 500, message: "server error" });
    }

    const folder = mediaid;
    const data = await Promise.all([
      cloudinary.api.delete_resources_by_prefix(folder, {
        resource_type: "image",
      }),
    ]);
    const data2 = await cloudinary.api.delete_folder(folder);

    return res.json({ status: 200, message: "image deleted successfully" });
    // console.log("images and videos",data)
    // console.log("folder delted",data)
  } catch (error) {
    console.log(
      "adminDeleteHalfUploadedFileCloudinaryController",
      error?.message,
    );
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { adminDeleteHomeCarouselImgController };
