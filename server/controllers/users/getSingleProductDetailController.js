const { pool } = require("../../database/db");

const getSingleProductDetailController = async (req, res) => {
  console.log("getSingleProductDetailController here");
  console.log("getSingleProductDetailController here", req?.params);

  try {
    if (Object.keys(req?.query)?.length > 0) {
      return res?.send({
        data: [],
        status: 500,
        message: "invalid request",
      });
    }
    if (Object.keys(req?.params)?.length == 0) {
      return res?.send({
        data: [],
        status: 500,
        message: "invalid request",
      });
    }
    if (req?.params?.id) {
      //       const result = await pool.query(
      //         `
      //         SELECT
      //    products.id,product_name,sellproduct_price_1kg,product_category,
      //    json_agg(json_build_object(
      //             'media.id',products_media.id,
      //              'products_id',products_media.products_id,
      //             'asset_folder',products_media.asset_folder,
      //             'public_id',products_media.public_id,
      //              'secure_url',products_media.secure_url,
      //             'resource_type',products_media.resource_type,
      //             'format',products_media.format,
      //             'original_filename',products_media.original_filename)) AS media
      //     FROM products

      // LEFT JOIN LATERAL (
      //    SELECT products_media.id, products_media.products_id,products_media.secure_url,products_media.resource_type
      //     FROM products_media
      //     WHERE products_media.products_id = products.id
      //     ORDER BY products_media.id ASC

      // ) AS products_media ON true

      // WHERE products.id=$1 AND EXISTS (
      // SELECT 1
      //     FROM products_variants
      //         WHERE products_variants.products_id = products.id
      //        AND products_variants.stock_status = $2
      // )

      //         `,
      //         [`${req?.params?.id}`, "Available"],
      //       );

      //////

      const query = `
        SELECT
           products.id,product_name,sellproduct_price_1kg,product_category,product_description,product_discount,delivery_type,delivery_charges,productbrand_name,

            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                           'media.id',products_media.id,
             'products_id',products_media.products_id,
             'secure_url',products_media.secure_url,
            'resource_type',products_media.resource_type,
            'format',products_media.format,
            'original_filename',products_media.original_filename
                        )
                        ORDER BY products_media.id ASC
                    )
                    FROM products_media 
                    WHERE products_media.products_id = products.id
                ),
                '[]'::json
            ) AS media,

            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'id', products_variants.id,
                            'size', products_variants.product_size,
                            'unit', products_variants.dairyfarm_unit,
                            'price', products_variants.sellproduct_price,
                            'stock_status', products_variants.stock_status,
                            'quantity', products_variants.product_quantity
                        )
                        ORDER BY products_variants.id ASC
                    )
                    FROM products_variants 
                    WHERE products_variants.products_id = products.id
                      AND products_variants.stock_status = 'Available'
                      AND products_variants.product_quantity >= 1
                ),
                '[]'::json
            ) AS Product_variants

        FROM products

        WHERE products.id = $1

        AND EXISTS (
            SELECT 1
            FROM products_variants 
            WHERE products_variants.products_id = products.id
              AND products_variants.stock_status = 'Available'
              AND products_variants.product_quantity >= 1
        );
    `;
      //////
      const result = await pool.query(query, [req?.params?.id]);
      if (result?.rows?.length < 1) {
        console.log("result not found", result?.rows);
        return res.send({
          status: 200,
          message: "no product found",
          data: [],
        });
      }
      console.log("result found", result?.rows);

      return res.send({ status: 200, data: result?.rows });
    }

    return res.json({ status: 500, data: [], message: "invalid request" });
  } catch (error) {
    console.log("getSingleProductDetailController error", error?.message);
    return res.json({ status: 500, data: [], message: "server error" });
  }
};

module.exports = { getSingleProductDetailController };
