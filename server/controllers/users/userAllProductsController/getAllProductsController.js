const { pool } = require("../../../database/db");

const getAllProductsController = async (req, res) => {
  const { limit } = req?.query;
  const cursor = Number(req?.query?.cursor);
  // console.log("cursor", typeof cursor);
  try {
    if (Object.keys(req?.query).length == 0) {
      return;
    }

    if (!cursor) {
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
    }
    if (cursor) {
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

      WHERE(products.id < $1) 
      AND EXISTS (
      SELECT 1
          FROM products_variants
              WHERE products_variants.products_id = products.id
             AND products_variants.stock_status = $2
      )
              ORDER BY products.id DESC
              LIMIT $3
              `,
        [cursor, "Available", limit],
      );

      if (result?.rows?.length < 1) {
        const products = result?.rows;

        const hasMore = products.length == limit;

        const nextCursor =
          products?.length > 0 ? products[products.length - 1].id : null;
        return res.send({
          status: 200,
          message: "no product found",
          data: [],
          nextCursor,
          hasMore,
        });
      }

      const products = result?.rows;

      const hasMore = products.length == limit;

      const nextCursor =
        products.length > 0 ? products[products.length - 1].id : null;
      return res.send({ status: 200, data: result?.rows, nextCursor, hasMore });
    }
  } catch (error) {
    console.log("getAllProductsController errors", error?.message);
    res?.send({ status: 500, message: "server error", data: [] });
  }
};

module.exports = { getAllProductsController };
