const { pool } = require("../../../database/db");

const adminEditFeaturedProductsController = async (req, res) => {
  try {
    if (Object.keys(req?.query)?.length < 2 || !req?.query) {
      return res.json({ status: 500, message: "invalid request" });
    }
    const { editFeatureProduct, productId } = req?.query;
    // conver string true false in to bollean type through this line
    const isFeatured = editFeatureProduct === "true";
    // conver string true false in to bollean type through this line

    const result = await pool.query(
      `UPDATE products SET is_featured=$1 WHERE id = $2 `,
      [isFeatured, productId],
    );
    if (result?.rowCount < 1) {
      return res.json({ status: 500, message: "server error" });
    }
    if (isFeatured == true) {
      return res.json({
        status: 200,
        message: "add to feature products",
      });
    }
    if (isFeatured == false) {
      return res.json({
        status: 200,
        message: "remove from feature products",
      });
    }
  } catch (error) {
    console.log("adminEditFeaturedProductsController error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { adminEditFeaturedProductsController };
