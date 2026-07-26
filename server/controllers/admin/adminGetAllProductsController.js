const { pool } = require("../../database/db");

const adminGetAllProductsController = async (req, res) => {
  const makeDataForFrontend = (dat) => {
    const dataready = dat.forEach((data, ind) => {});
  };
  //    json_agg(
  //     json_build_object(
  //         'media_id', pm.media_id,
  //         'file_name', pm.file_name
  //     )
  // ) AS media

  try {
    // this is the normal quer tro get data from both table but through this approach each product repeated dat for each row
    // const result = await await pool.query(`
    //     SELECT products.id,product_name,sellproduct_price,product_category,stock_status,products_media.id,
    //     products_media.products_id,products_media.asset_folder,products_media.public_id,products_media.secure_url,
    //     products_media.resource_type,products_media.format,products_media.original_filename FROM products
    //     LEFT JOIN products_media ON products.id=products_media.products_id
    //     `)
    // this is the normal quer tro get data from both table but through this approach each product repeated dat for each row end here


    const result = await await pool.query(`
            SELECT products.id,product_name,sellproduct_price,product_category,stock_status,
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
              GROUP BY
        products.id,
        product_name,sellproduct_price,product_category,stock_status
            `);

    if (result?.rows?.length < 1) {
      return res.send({ status: 400, message: "no product found" });
    }
    makeDataForFrontend(result?.rows);
    return res.send({ status: 200, data: result?.rows });
  } catch (error) {
    console.log("errors", error?.message);
    res?.send({ status: 500, message: "server error" });
  }
};
module.exports = { adminGetAllProductsController };
