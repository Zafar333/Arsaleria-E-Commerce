const { pool } = require("../../database/db");

const adminGetInStockProductsController = async (req, res) => {
  try {
    if (
      Object.keys(req?.query)?.length == 0 ||
      !req?.query ||
      !req?.query?.stockStatus
    ) {
      return res?.json({ status: 500, message: "please send valid data" });
    }

    const result = await pool.query(
      `
            SELECT products.id,product_name,sellproduct_price_1kg,product_category,is_featured,
            json_agg(json_build_object(
            'media.id',products_media.id,
             'products_id',products_media.products_id,
            'asset_folder',products_media.asset_folder,
            'public_id',products_media.public_id,
             'secure_url',products_media.secure_url,
            'resource_type',products_media.resource_type,
            'format',products_media.format,
            'original_filename',products_media.original_filename)) AS media FROM products 
            LEFT JOIN products_media ON products.id=products_media.products_id
            WHERE EXISTS (
              SELECT 1
             FROM products_variants 
             WHERE products_variants.products_id = products.id
            AND products_variants.stock_status = $1
              )
              GROUP BY
            products.id,
             product_name,sellproduct_price_1kg,product_category,is_featured
            `,
      [req?.query?.stockStatus],
    );

    if (result?.rows?.length < 1) {
      return res.send({ status: 400, message: "No product found" });
    }
    return res.send({ status: 200, data: result?.rows });
  } catch (error) {
    console.log("errors", error?.message);
    res?.send({ status: 500, message: "server error" });
  }
};
module.exports = { adminGetInStockProductsController };
