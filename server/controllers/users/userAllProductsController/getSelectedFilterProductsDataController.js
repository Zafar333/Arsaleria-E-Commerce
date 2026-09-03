const { pool } = require("../../../database/db");

const getSelectedFilterProductsDataController = async (req, res) => {
  const data = req?.query;
  const { limit, cursor, ...newqueryParams } = data;
  //   console.log("newqueryParams", Number(Object?.values(newqueryParams)));
  //   const { limit } = req?.query;
  //   const cursor = Number(req?.query?.cursor);
  // console.log("cursor", typeof cursor);
  try {
    if (Object.keys(req?.query).length == 0) {
      return res.send({ status: 500, message: "bad request" });
    }
    if (Object.keys(req?.query).length > 0 && !limit) {
      return res.send({ status: 500, message: "bad request" });
    }
    if (req?.query?.limit) {
      const data = req?.query;
      const { limit, cursor, ...newqueryParams } = data;
      const querParamsarray = Object?.values(newqueryParams);
      console.log("querParamsarray", querParamsarray);
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

WHERE 
    products.product_category = ANY($1::bigint[])
AND EXISTS (
SELECT 1
    FROM products_variants 
        WHERE products_variants.products_id = products.id
       AND products_variants.stock_status = $2
)
        ORDER BY products.id DESC
        LIMIT $3
        `,
        [querParamsarray, "Available", req?.query?.limit],
      );
      //   console.log("result", result?.rows);
      if (result?.rows?.length < 1) {
        return res.send({
          status: 200,
          message: "no product found",
          data: result?.rows,
        });
      }

      return res.send({ status: 200, data: result?.rows });
    }
  } catch (error) {
    console.log(
      "getSelectedFilterProductsDataController errors",
      error?.message,
    );
    res?.send({
      status: 500,
      message: "backend server error",
      data: [],
    });
  }
};

module.exports = { getSelectedFilterProductsDataController };
