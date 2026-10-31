const { pool } = require("../../database/db");

const admiGetSpecificOrderDetailController = async (req, res) => {
  console.log(" admiGetSpecificOrderDetailController here");

  try {
    if (Object.keys(req?.params)?.length == 0 || !req?.params?.id) {
      return res.json({ status: 500, message: "invalid request" });
    }

    const result = await pool.query(
      `SELECT orders_detail.id,orders_detail.order_id,orders_detail.products_variantid,orders_detail.product_name,
        orders_detail.sellproduct_price,orders_detail.image_url,orders_detail.size,orders_detail.unit,
        orders_detail.buy_quantity,orders_detail.delivery_charges 
        FROM orders_detail
        WHERE orders_detail.order_id = $1
        `,
      [Number(req?.params?.id)],
    );
    // console.log("order detail result", result?.rows);
    if (result?.rowCount == 0) {
      return res.json({
        status: 500,
        message: "server error",
        data: [],
      });
    }
    return res.json({ status: 200, data: result?.rows });
  } catch (error) {
    console.log("admiGetSpecificOrderDetailController error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { admiGetSpecificOrderDetailController };
