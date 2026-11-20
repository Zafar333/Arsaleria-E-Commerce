const { pool } = require("../../../database/db");

const userMultipleProductsOrderController = async (req, res) => {
  console.log("userMultipleProductsOrderController here", req?.body);
  const client = await pool.connect();
  try {
    // multiple products cashonDelivery query is start from here

    if (
      Object.keys(req?.body)?.length > 0 &&
      req?.body?.userId &&
      req?.body?.cartProducts?.length > 0 &&
      req?.body?.grandTotalState?.length > 0 &&
      req?.body?.shippingDetails &&
      req?.body?.shippingDetails?.paymentMethod
      // req?.body?.shippingDetails?.paymentMethod == "cashOnDelivery"
    ) {
      await client.query("BEGIN");
      const checkProductQuantity = [];

      for (const prod of req?.body?.cartProducts) {
        const result = await pool.query(
          `SELECT id,product_quantity FROM products_variants WHERE id = $1 AND  product_quantity>=$2`,
          [Number(prod?.productVariantId), Number(prod?.buyQuantity)],
        );

        checkProductQuantity.push(...result?.rows);
      }

      if (checkProductQuantity?.length != req?.body?.cartProducts?.length) {
        await client.query("ROLLBACK");

        return res?.json({
          status: "500",
          message: "sorry product is out of stock",
        });
      }
      if (req?.body?.shippingDetails?.paymentMethod == "cashOnDelivery") {
        // order table query is start from here
        const orderId = await client.query(
          `INSERT INTO orders (users_id,user_name,total_price,payment_status,contact_no,city,postal_code,Shipping_address) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
          [
            Number(req?.body?.userId),
            req?.body?.shippingDetails?.name,
            Number(req?.body?.grandTotalState[0]),
            req?.body?.shippingDetails?.paymentMethod,
            req?.body?.shippingDetails?.number,
            req?.body?.shippingDetails?.city,
            req?.body?.shippingDetails?.postalcode,
            req?.body?.shippingDetails?.address,
          ],
        );
        // order table query is end here
        //   // console.log("orderId", orderId);

        if (orderId?.rows?.length == 0) {
          await client.query("ROLLBACK");
          return res?.json({ status: "500", message: "server error" });
        }
        // return res?.json({ status: "500", message: "server error" });

        // insert orderDetail query is start from here
        const insertData = [];
        for (const data of req?.body?.cartProducts) {
          const rslt = await client.query(
            `
          INSERT INTO orders_detail (order_id,products_variantid,product_name,sellproduct_price,image_url,size,unit,buy_quantity,delivery_charges) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id
          `,
            [
              Number(orderId?.rows[0]?.id),
              Number(data?.productVariantId),
              data?.product_name,
              Number(data?.price),
              data?.img,
              data?.size,
              data?.unit,
              Number(data?.buyQuantity),
              Number(data?.delivery_charges),
            ],
          );
          insertData?.push(...rslt?.rows);
        }
        // insert orderDetail query is end here

        if (
          insertData?.length == 0 ||
          insertData?.length != req?.body?.cartProducts?.length
        ) {
          await client.query("ROLLBACK");

          return res?.json({
            status: "500",
            message: "server error",
          });
        }

        // update the quantity in stock query is start from here
        const updatedProductQuantity = [];
        for (const proData of req?.body?.cartProducts) {
          const rslt = await client?.query(
            `UPDATE products_variants
               SET product_quantity = product_quantity - $1
               WHERE id = $2
               AND product_quantity >= $3
               RETURNING id,product_quantity`,
            [
              Number(proData?.buyQuantity),
              Number(proData?.productVariantId),
              Number(proData?.buyQuantity),
            ],
          );
          updatedProductQuantity.push(...rslt?.rows);
        }
        // update the quantity in stock query is end here

        if (
          updatedProductQuantity?.length == 0 ||
          updatedProductQuantity?.length != req?.body?.cartProducts?.length
        ) {
          await client.query("ROLLBACK");
          return res?.json({ status: "500", message: "server error" });
        }
        // console.log("updatedProductQuantity", updatedProductQuantity);

        // update the quantityStatus whose stock quantity is zero query is start from here
        const qunatityStatus = updatedProductQuantity?.filter(
          (data) => data?.product_quantity == 0,
        );
        // console.log("qunatityStatus", qunatityStatus);

        if (qunatityStatus?.length > 0) {
          const unAvailableQuantityStatus = [];
          for (const quatData of qunatityStatus) {
            const rsl = await client.query(
              `UPDATE products_variants
              SET stock_status = $1
              WHERE id = $2
              RETURNING id,product_quantity
              `,
              ["UnAvailable", quatData?.id],
            );
            unAvailableQuantityStatus.push(...rsl?.rows);
          }
          // update the quantityStatus whose stock quantity is zero query is end here

          if (unAvailableQuantityStatus?.length != qunatityStatus?.length) {
            await client.query("ROLLBACK");
            return res?.json({
              status: "500",
              message: "server error",
            });
          }
          // console.log("unAvailableQuantityStatus", unAvailableQuantityStatus);
          await client.query("COMMIT");
          return res.json({
            status: 200,
            message: "order register successfully",
          });
        }
        await client.query("COMMIT");
        return res.json({
          status: 200,
          message: "order register successfully",
        });
      }
      // multiple products cashonDelivery query is end  here

      //  payment online cash order section is start from here
      if (req?.body?.shippingDetails?.paymentMethod == "online") {
        // order table query is start from here
        const orderId = await client.query(
          `INSERT INTO orders (users_id,user_name,total_price,payment_status,contact_no,city,postal_code,Shipping_address) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
          [
            Number(req?.body?.userId),
            req?.body?.shippingDetails?.name,
            Number(req?.body?.grandTotalState[0]),
            req?.body?.shippingDetails?.paymentMethod,
            req?.body?.shippingDetails?.number,
            req?.body?.shippingDetails?.city,
            req?.body?.shippingDetails?.postalcode,
            req?.body?.shippingDetails?.address,
          ],
        );
        // order table query is end here
        //   // console.log("orderId", orderId);

        if (orderId?.rows?.length == 0) {
          await client.query("ROLLBACK");
          return res?.json({ status: "500", message: "server error" });
        }
        // return res?.json({ status: "500", message: "server error" });

        // insert orderDetail query is start from here
        const insertData = [];
        for (const data of req?.body?.cartProducts) {
          const rslt = await client.query(
            `
          INSERT INTO orders_detail (order_id,products_variantid,product_name,sellproduct_price,image_url,size,unit,buy_quantity,delivery_charges) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id
          `,
            [
              Number(orderId?.rows[0]?.id),
              Number(data?.productVariantId),
              data?.product_name,
              Number(data?.price),
              data?.img,
              data?.size,
              data?.unit,
              Number(data?.buyQuantity),
              Number(data?.delivery_charges),
            ],
          );
          insertData?.push(...rslt?.rows);
        }
        // insert orderDetail query is end here

        if (
          insertData?.length == 0 ||
          insertData?.length != req?.body?.cartProducts?.length
        ) {
          await client.query("ROLLBACK");

          return res?.json({
            status: "500",
            message: "server error",
          });
        }

        // update the quantity in stock query is start from here
        const updatedProductQuantity = [];
        for (const proData of req?.body?.cartProducts) {
          const rslt = await client?.query(
            `UPDATE products_variants
               SET product_quantity = product_quantity - $1
               WHERE id = $2
               AND product_quantity >= $3
               RETURNING id,product_quantity`,
            [
              Number(proData?.buyQuantity),
              Number(proData?.productVariantId),
              Number(proData?.buyQuantity),
            ],
          );
          updatedProductQuantity.push(...rslt?.rows);
        }
        // update the quantity in stock query is end here

        if (
          updatedProductQuantity?.length == 0 ||
          updatedProductQuantity?.length != req?.body?.cartProducts?.length
        ) {
          await client.query("ROLLBACK");
          return res?.json({ status: "500", message: "server error" });
        }
        // console.log("updatedProductQuantity", updatedProductQuantity);

        // update the quantityStatus whose stock quantity is zero query is start from here
        const qunatityStatus = updatedProductQuantity?.filter(
          (data) => data?.product_quantity == 0,
        );
        // console.log("qunatityStatus", qunatityStatus);

        if (qunatityStatus?.length > 0) {
          const unAvailableQuantityStatus = [];
          for (const quatData of qunatityStatus) {
            const rsl = await client.query(
              `UPDATE products_variants
              SET stock_status = $1
              WHERE id = $2
              RETURNING id,product_quantity
              `,
              ["UnAvailable", quatData?.id],
            );
            unAvailableQuantityStatus.push(...rsl?.rows);
          }
          // update the quantityStatus whose stock quantity is zero query is end here

          if (unAvailableQuantityStatus?.length != qunatityStatus?.length) {
            await client.query("ROLLBACK");
            return res?.json({
              status: "500",
              message: "server error",
            });
          }
          // console.log("unAvailableQuantityStatus", unAvailableQuantityStatus);
          await client.query("COMMIT");
          return res.json({
            status: 200,
            message: "order register successfully",
          });
        }
        await client.query("COMMIT");
        return res.json({
          status: 200,
          message: "order register successfully",
        });
      }
      //  payment online cash order section is end here
    } else {
      return res.json({ status: 500, message: "please send valid data" });
    }

    // multiple products cashonDelivery query is end here
  } catch (error) {
    console.log("userMultipleProductsOrderController error", error?.message);
    return res.json({ status: 500, message: "server error" });
  } finally {
    client.release();
  }
};

module.exports = { userMultipleProductsOrderController };
