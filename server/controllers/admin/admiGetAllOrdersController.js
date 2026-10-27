const { pool } = require("../../database/db");

const admiGetAllOrdersController = async (req, res) => {
  console.log("admiGetAllOrdersController here", req?.query);
  try {
    if (Object.keys(req?.query)?.length == 0 || !req.query?.order) {
      return res.json({ status: 500, message: "server error" });
    }
    if (
      Object.keys(req?.query)?.length == 1 &&
      req.query?.order == "allorders"
    ) {
      const result =
        await pool.query(`SELECT orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat,
        json_agg(json_build_object(
            ' orders_detail_id',orders_detail.id,
            'order_id',orders_detail.order_id,
            'products_variantid',orders_detail.products_variantid,
            'product_name',orders_detail.product_name,
        'sellproduct_price',orders_detail.sellproduct_price,
        'image_url',orders_detail.image_url,
        'size',orders_detail.size,
        'unit',orders_detail.unit,
        'buy_qunatity',orders_detail.buy_qunatity,
        'delivery_charges',orders_detail.delivery_charges)) AS orderdetail 
        FROM orders LEFT JOIN orders_detail
        ON orders.id = orders_detail.order_id
        GROUP BY orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat
        `);
      console.log("allorders result", result?.rows);
      if (result?.rowCount == 0) {
        return res.json({ status: 200, message: "no order yet", data: [] });
      }
      return res.json({ status: 200, data: result?.rows });
    }
    if (
      Object.keys(req?.query)?.length == 1 &&
      req.query?.order != "allorders"
    ) {
      const result = await pool.query(
        `SELECT orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat,
        json_agg(json_build_object(
            ' orders_detail_id',orders_detail.id,
            'order_id',orders_detail.order_id,
            'products_variantid',orders_detail.products_variantid,
            'product_name',orders_detail.product_name,
        'sellproduct_price',orders_detail.sellproduct_price,
        'image_url',orders_detail.image_url,
        'size',orders_detail.size,
        'unit',orders_detail.unit,
        'buy_qunatity',orders_detail.buy_qunatity,
        'delivery_charges',orders_detail.delivery_charges)) AS orderdetail 
        FROM orders LEFT JOIN orders_detail
        ON orders.id = orders_detail.order_id 
        WHERE orders.order_status = $1
        GROUP BY orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat
        `,
        [req?.query?.order],
      );
      console.log("pending result", result?.rows);
      if (result?.rowCount == 0) {
        return res.json({
          status: 200,
          message: "not found",
          data: [],
        });
      }
      return res.json({ status: 200, data: result?.rows });
    }

    // for serach and filter query start here
    if (
      Object.keys(req?.query)?.length == 2 &&
      req.query?.order &&
      req.query?.order != "allorders" &&
      req?.query?.name
    ) {
      const result = await pool.query(
        `SELECT orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat,
        json_agg(json_build_object(
          ' orders_detail_id',orders_detail.id,
          'order_id',orders_detail.order_id,
          'products_variantid',orders_detail.products_variantid,
          'product_name',orders_detail.product_name,
        'sellproduct_price',orders_detail.sellproduct_price,
        'image_url',orders_detail.image_url,
        'size',orders_detail.size,
        'unit',orders_detail.unit,
        'buy_qunatity',orders_detail.buy_qunatity,
        'delivery_charges',orders_detail.delivery_charges)) AS orderdetail 
        FROM orders LEFT JOIN orders_detail
        ON orders.id = orders_detail.order_id 
        WHERE orders.order_status = $1 AND
         orders.user_name ILIKE $2
        GROUP BY orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat
        `,
        [req?.query?.order, `${req?.query?.name}%`],
      );
      console.log("pending result", result?.rows);
      if (result?.rowCount == 0) {
        return res.json({
          status: 500,
          message: "not found",
          data: [],
        });
      }
      return res.json({ status: 200, data: result?.rows });
    }
    // for serach and filter query end here

    // serach and only allorders filter  query start here
    if (
      Object.keys(req?.query)?.length == 2 &&
      req.query?.order &&
      req.query?.order == "allorders" &&
      req?.query?.name
    ) {
      const result = await pool.query(
        `SELECT orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat,
        json_agg(json_build_object(
          ' orders_detail_id',orders_detail.id,
          'order_id',orders_detail.order_id,
          'products_variantid',orders_detail.products_variantid,
          'product_name',orders_detail.product_name,
        'sellproduct_price',orders_detail.sellproduct_price,
        'image_url',orders_detail.image_url,
        'size',orders_detail.size,
        'unit',orders_detail.unit,
        'buy_qunatity',orders_detail.buy_qunatity,
        'delivery_charges',orders_detail.delivery_charges)) AS orderdetail 
        FROM orders LEFT JOIN orders_detail
        ON orders.id = orders_detail.order_id 
        WHERE orders.user_name ILIKE $1
        GROUP BY orders.id,orders.users_id,orders.user_name,orders.total_price,orders.payment_status,orders.order_status,orders.contact_no,orders.city,
        orders.postal_code,orders.shipping_address,orders.created_dat
        `,
        [`${req?.query?.name}%`],
      );
      console.log("pending result", result?.rows);
      if (result?.rowCount == 0) {
        return res.json({
          status: 500,
          message: "not found",
          data: [],
        });
      }
      return res.json({ status: 200, data: result?.rows });
    }
    // for serach and only allorders filter query end here
  } catch (error) {
    console.log("", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { admiGetAllOrdersController };
