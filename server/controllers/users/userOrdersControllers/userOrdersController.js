const { pool } = require("../../../database/db");

const userOrdersController = async (req, res) => {
  console.log("userOrdersController here", req?.body);
  const client = await pool.connect();
  try {
    if (
      Object.keys(req?.body)?.length > 0 &&
      req?.body?.userId &&
      req?.body?.cartProducts?.length > 0 &&
      req?.body?.grandTotalState?.length > 0 &&
      req?.body?.shippingDetails
    ) {
      // 🔍 Check if email already exists
      await client.query("BEGIN");
      const checkProductQuantity = await client.query(
        `SELECT id, product_quantity FROM products_variants WHERE id = $1 AND  product_quantity>=$2`,
        [
          req?.body?.cartProducts[0]?.productVariantId,
          req?.body?.cartProducts[0]?.buyQuantity,
        ],
      );
      // console.log("result", checkProductQuantity);
      if (checkProductQuantity?.rows?.length == 0) {
        await client.query("ROLLBACK");

        return res?.json({
          status: "400",
          message: "sorry product is out of stock",
        });
      }
      if (req?.body?.shippingDetails?.paymentMethod == "cashOnDelivery") {
        // order table query is start from here
        const orderId = await client.query(
          `INSERT INTO orders (users_id,user_name,total_price,payment_status,contact_no,city,postal_code,Shipping_address) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
          [
            req?.body?.userId,
            req?.body?.shippingDetails?.name,
            Number(req?.body?.grandTotalState[0]),
            req?.body?.shippingDetails?.paymentMethod,
            req?.body?.shippingDetails?.number,
            req?.body?.shippingDetails?.city,
            req?.body?.shippingDetails?.postalcode,
            req?.body?.shippingDetails?.shippingAddress,
          ],
        );
        // order table query is end here
        // console.log("orderId", orderId);

        if (orderId?.rows?.length == 0) {
          await client.query("ROLLBACK");
          return res?.json({ status: "500", message: "server error" });
        }

        // order-detail table query is start from here

        const data = await client?.query(
          `
          INSERT INTO orders_detail (order_id,products_variantid,product_name,sellproduct_price,image_url,size,unit,buy_quantity,delivery_charges) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id
          `,
          [
            orderId?.rows[0]?.id,
            req?.body?.cartProducts[0]?.productVariantId,
            req?.body?.cartProducts[0]?.product_name,
            req?.body?.cartProducts[0]?.price,
            req?.body?.cartProducts[0]?.img,
            req?.body?.cartProducts[0]?.size,
            req?.body?.cartProducts[0]?.unit,
            req?.body?.cartProducts[0]?.buyQuantity,
            req?.body?.cartProducts[0]?.delivery_charges,
          ],
        );
        // order-detail table query is end here

        if (data?.rowCount?.length == 0) {
          await client.query("ROLLBACK");

          return res?.json({
            status: "500",
            message: "server error",
          });
        }

        const qua = 1;
        const productQunatity = await client?.query(
          `UPDATE products_variants
           SET product_quantity = product_quantity - $1
           WHERE id = $2
           AND product_quantity >= $3
           RETURNING id,product_quantity`,
          [
            qua,
            req?.body?.cartProducts[0]?.productVariantId,
            req?.body?.cartProducts[0]?.buyQuantity,
          ],
        );
        if (productQunatity?.rowCount == 0) {
          await client.query("ROLLBACK");
          return res?.json({ status: "500", message: "server error" });
        }
        // console.log("product Quantity", productQunatity?.rows);
        if (productQunatity?.rows[0]?.product_qunatity == 0) {
          const updateStatus = await client.query(
            `UPDATE products_variants
              SET stock_status = $1
              WHERE id = $2

              `,
            ["UnAvailable", productQunatity?.rows[0]?.id],
          );

          if (updateStatus?.rowCount == 0) {
            await client.query("ROLLBACK");
            return res.send({ status: 500, message: "server error" });
          }
          await client.query("COMMIT");

          return res?.json({
            orderid: orderId?.rows[0],
            status: 200,
            message: "order completed sucessfully",
          });
        }
        await client.query("COMMIT");

        return res?.json({
          orderid: orderId?.rows[0],
          status: "200",
          message: "order completed successfully",
        });
      }

      if (req?.body?.shippingDetails?.paymentMethod == "online") {
        return res?.json({
          status: "200",
          message: "online order is submit",
        });
      }
    } else {
      return res?.json({
        status: "400",
        message: "please send valid credentials",
      });
    }
  } catch (err) {
    console.log("userOrdersController error", err?.message);
    await client.query("ROLLBACK");
    return res.send({ status: 500, message: "server error" });
  } finally {
    // Always release the client
    client.release();
  }
};

module.exports = { userOrdersController };
