const { pool } = require("../../database/db");

const getAllImgsCrouselController = async (req, res) => {
  // console.log("getAllImgsCrouselController here");
  try {
    const result = await pool.query(`SELECT * FROM homecarousel_media`);
    if (result?.rows?.length > 0) {
      return res.json({ status: 200, data: result?.rows });
    }
    return res.json({ status: 200, data: [] });
  } catch (error) {
    console.log("userGetAllHomeCarouselImgsController error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { getAllImgsCrouselController };
