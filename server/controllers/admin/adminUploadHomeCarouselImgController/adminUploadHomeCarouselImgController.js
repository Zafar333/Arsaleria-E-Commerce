const { pool } = require("../../../database/db");
const cloudinary = require("../../../configFiles/cloudinaryCloudConfig");

const adminUploadHomeCarouselImgController = async (req, res) => {
  //   console.log("adminUploadHomeCarouselImgController", req?.body);
  const folder = req?.body[0]?.asset_folder;
  try {
    if (req?.body?.length < 1) {
      return res.json({ status: 500, message: "server error" });
    }
    const result = await pool.query(
      `INSERT INTO homecarousel_media (secure_url,resource_type,format,original_filename,asset_folder,public_id) 
        VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        req?.body[0]?.secure_url,
        req?.body[0]?.resource_type,
        req?.body[0]?.format,
        req?.body[0]?.original_filename,
        req?.body[0]?.asset_folder,
        req?.body[0]?.public_id,
      ],
    );
    if (result?.rowCount < 1) {
      const data = await Promise.all([
        cloudinary.api.delete_resources_by_prefix(folder, {
          resource_type: "image",
        }),
      ]);
      const data2 = await cloudinary.api.delete_folder(folder);
      return res.json({ status: 500, message: "server error" });
    }

    return res.json({ status: 200, message: "image upload sucessfully" });
  } catch (error) {
    const data = await Promise.all([
      cloudinary.api.delete_resources_by_prefix(folder, {
        resource_type: "image",
      }),
    ]);
    const data2 = await cloudinary.api.delete_folder(folder);
    console.log("adminUploadHomeCarouselImgController", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};
module.exports = { adminUploadHomeCarouselImgController };
