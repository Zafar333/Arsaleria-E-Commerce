const { pool } = require("../../../database/db");

const adminEditFeaturedProductsController = async (req, res) => {
  try {
    if (Object.keys(req?.query)?.length < 2 || !req?.query) {
      return res.json({ status: 500, message: "invalid request" });
    }
    const { editFeatureProduct, productId } = req?.query;
    const result = await pool.query(
      `UPDATE products SET is_featured=$1 WHERE id = $2 `,
      [editFeatureProduct, productId],
    );
    if (result?.rowCount < 1) {
      return res.json({ status: 500, message: "server error" });
    }
    return res.json({
      status: 200,
      message: "add to feature products",
    });
  } catch (error) {
    console.log("adminEditFeaturedProductsController error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { adminEditFeaturedProductsController };
