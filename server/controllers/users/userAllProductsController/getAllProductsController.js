const { pool } = require("../../../database/db");

const getAllProductsController = async (req, res) => {
  try {
    const limit = 10;

    const result = await pool.query(
      `
        SELECT
   products.id,product_name,sellproduct_price_1kg,product_category,
   products_media.id AS imgid, 
    products_media.products_id,
    products_media.secure_url,
    products_media.resource_type
     FROM products

LEFT JOIN LATERAL (
   SELECT products_media.id, products_media.products_id,products_media.secure_url,products_media.resource_type
    FROM products_media
    WHERE products_media.products_id = products.id
      AND products_media.resource_type = 'image'
    ORDER BY products_media.id ASC
    LIMIT 1
) AS products_media ON true

WHERE EXISTS (
SELECT 1
    FROM products_variants 
        WHERE products_variants.products_id = products.id
       AND products_variants.stock_status = $1
)
        ORDER BY products.id DESC
        LIMIT $2
        `,
      ["Available", limit],
    );

    if (result?.rows?.length < 1) {
      return res.send({ status: 400, message: "no product found" });
    }
    return res.send({ status: 200, data: result?.rows });
  } catch (error) {
    console.log("getHeroSectionAllProductsController errors", error?.message);
    res?.send({ status: 500, message: "server error" });
  }
};

module.exports = { getAllProductsController };
