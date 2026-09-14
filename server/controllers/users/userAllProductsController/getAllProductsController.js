const { pool } = require("../../../database/db");

const getAllProductsController = async (req, res) => {
  try {
    console.log("getAllProductsController here");
    console.log("getAllProductsController here", req?.query);
    const data = req?.query;
    const { limit, cursor, search } = req?.query;

    const categoryFun = () => {
      if (Object.hasOwn(req?.query, "search")) {
        // console.log("search");

        const { limit, cursor, search, ...categories } = data;
        return categories;
      }
      if (!Object.hasOwn(req?.query, "search")) {
        // console.log("!search", data);
        const { limit, cursor, ...categories } = data;
        return categories;
      }
    };

    const categoryIds = await categoryFun();
    //  const { limit } = req?.query;

    // console.log("cursor", cursor);
    const values = [];
    const conditions = [];
    if (Object.keys(req?.query).length == 0) {
      return res?.send({
        status: 500,
        message: "invalid request",
        data: [],
        nextCursor: null,
        hasMore: false,
      });
    }
    if (Object.keys(req?.query).length > 0 && !limit) {
      return res?.send({
        status: 500,
        message: "invalid request",
        data: [],
        nextCursor: null,
        hasMore: false,
      });
    }
    if (req?.query?.limit) {
      values.push("Available");
      conditions.push(`EXISTS (
SELECT 1
    FROM products_variants 
        WHERE products_variants.products_id = products.id
       AND products_variants.stock_status = $${values.length}
)`);

      // --------------------------------------------------
      // 2. Product name search
      // --------------------------------------------------

      if (req?.query?.search || search) {
        // console.log("i am seearch in");
        values.push(`${req?.query?.search}%`);

        conditions.push(`
      products.product_name ILIKE $${values.length}
    `);
      }

      // --------------------------------------------------
      // 3. Category filter
      // --------------------------------------------------

      if (Object.keys(categoryIds).length > 0) {
        // console.log("i am categories in");

        const categoryId = Object.values(categoryIds);
        // console.log("cat", categoryId);
        values.push(categoryId);

        conditions.push(`
      products.product_category = ANY($${values.length}::int[])
    `);
      }

      // --------------------------------------------------
      // 4. Featured filter
      // --------------------------------------------------

      // if (isFeatured !== null) {
      //   values.push(isFeatured);

      //   conditions.push(`
      //     p.is_featured = $${values.length}
      //   `);
      // }

      // --------------------------------------------------
      // 5. Cursor pagination
      // --------------------------------------------------

      if (cursor != null && cursor != "null" && cursor != undefined) {
        // console.log("i am cursor in");

        values.push(req?.query?.cursor);

        conditions.push(`
      products.id < $${values?.length}
    `);
      }

      // --------------------------------------------------
      // 6. Limit
      // --------------------------------------------------

      values.push(req?.query?.limit);
      // console.log("values", values);
      const qr = `
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

WHERE ${conditions.join(" AND ")}
        ORDER BY products.id DESC
        LIMIT $${values?.length}

        `;
      const result = await pool.query(qr, values);

      if (result?.rows?.length < 1) {
        const products = result?.rows;

        const hasMore = products.length == limit;

        const nextCursor =
          products?.length > 0 ? products[products.length - 1].id : null;
        console.log("results cursor", nextCursor, hasMore);
        console.log("results", result?.rows);
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
      console.log("results cursor", nextCursor, hasMore);
      console.log("results", result?.rows);
      return res.send({ status: 200, data: result?.rows, nextCursor, hasMore });
    }
  } catch (error) {
    console.log("getAllProductsController errors", error?.message);
    return res?.send({
      status: 500,
      message: "server error",
      data: [],
      nextCursor: null,
      hasMore: false,
    });
  }
};

module.exports = { getAllProductsController };
