const cloudinary = require("../../configFiles/cloudinaryCloudConfig");

const adminDeleteHalfUploadedHomeCarouselImgCloudinaryController = async (
  req,
  res,
) => {
  try {
    const { assets } = req?.body;
    if (
      !req?.body ||
      Object.keys(req?.body)?.length == 0 ||
      req?.body?.length == 0
    ) {
      return res.send({ status: 500, success: "false" });
    }

    // console.log("dtata",assets)
    const folder = assets[0]?.asset_folder;
    // console.log("folder",folder)

    const data = await Promise.all([
      cloudinary.api.delete_resources_by_prefix(folder, {
        resource_type: "image",
      }),
    ]);
    return res.json({ status: 200, success: "true" });
    // console.log("images and videos",data)
    // console.log("folder delted",data)
  } catch (error) {
    console.log(
      "adminDeleteHalfUploadedFileCloudinaryController",
      error?.message,
    );
    return res.json({ status: 500, success: "false" });
  }
};

module.exports = { adminDeleteHalfUploadedHomeCarouselImgCloudinaryController };
