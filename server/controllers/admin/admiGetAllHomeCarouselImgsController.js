const admiGetAllHomeCarouselImgsController = async (req, res) => {
  console.log("admiGetAllHomeCarouselImgsController here");
  return res.json({ status: 200, message: "success" });
};

module.exports = { admiGetAllHomeCarouselImgsController };
