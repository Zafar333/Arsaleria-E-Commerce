const { pool } = require("../../../database/db");

const getAllProductsCursorPaginationController = async (req, res) => {
  console.log("getAllProductsCursorPaginationController here");
  try {
    const { limit } = req?.query;
    const cursor = Number(req?.query?.cursor);
    if (Object.keys(req?.query).length == 0) {
      return res?.send({
        status: 500,
        message: "server error",
        data: [],
        nextCursor: null,
        hasMore: false,
      });
    }
    if (Object.keys(req?.query).length > 0 && !limit && !cursor) {
      return res?.send({
        status: 500,
        message: "server error",
        data: [],
        nextCursor: null,
        hasMore: false,
      });
    }
    if (limit && !cursor) {
      const result = await pool.query(
        ` SELECT products.id
FROM products
WHERE EXISTS (
    SELECT 1
    FROM products_variants
    WHERE products_variants.products_id = products.id
      AND products_variants.stock_status =$1
)
              ORDER BY products.id DESC
              LIMIT $2
             
             `,
        ["Available", limit],
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
      return res.send({ status: 200, data: [], nextCursor, hasMore });
    }
    if (limit && cursor) {
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
    console.log(
      "getAllProductsCursorPaginationController errors",
      error?.message,
    );
    res?.send({
      status: 500,
      message: "server error",
      data: [],
      nextCursor: null,
      hasMore: false,
    });
  }
};

module.exports = { getAllProductsCursorPaginationController };
