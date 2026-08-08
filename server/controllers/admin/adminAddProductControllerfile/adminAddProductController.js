const { pool } = require("../../../database/db");
const cloudinary = require("../../../configFiles/cloudinaryCloudConfig");

const adminAddProductController = async (req, res) => {
  const getDdata = req?.body;
  console.log("bodydata", req?.body);
  // console.log("media", getDdata[0]?.files);
  // console.log("bodydata", getDdata[1]);

  const client = await pool.connect();
  try {
    if (
      !req?.body ||
      Object.keys(req?.body)?.length == 0 ||
      req?.body == null
    ) {
      return res.json({ status: 500, message: "please send valid data" });
    }
    if (
      getDdata[0]?.files?.length > 0 &&
      getDdata[2]?.productsVariants?.length > 0 &&
      getDdata[1]?.productName &&
      getDdata[1]?.actualproductPrice1kg &&
      getDdata[1]?.productSellPrice1kg &&
      getDdata[1]?.deliveryType &&
      getDdata[1]?.productDescription &&
      getDdata[1]?.productCategory
    ) {
      // add product data insert query transaction is satart from here

      await client.query("BEGIN");

      // 1. Insert product in products table
      const productQuery = `
    INSERT INTO products
    (
      product_name,
      actualproduct_price_1kg,
      sellproduct_price_1kg,
      dairyfarm_expiryDate,
      dairyfarm_material,
      delivery_charges,
      delivery_type,
      productbrand_name,
      product_description,
      product_discount,
      productpromo_code,
      product_category
    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING id;
  `;
      const productValues = [
        getDdata[1]?.productName,
        getDdata[1]?.actualproductPrice1kg,
        getDdata[1]?.productSellPrice1kg,
        getDdata[1]?.dairyFarmExpiryDate,
        getDdata[1]?.dairyFarmMaterial,
        getDdata[1]?.deliveryCharges,
        getDdata[1]?.deliveryType,
        getDdata[1]?.productBrandName,
        getDdata[1]?.productDescription,
        getDdata[1]?.productDiscount,
        getDdata[1]?.productPromoCode,
        getDdata[1]?.productCategory,
      ];
      // add product data insert query transaction is end here
      const productResult = await client.query(productQuery, productValues);

      //////

      if (productResult?.rows?.length > 0) {
        // console.log("productresult", productResult)

        // 2. Insert all product media images and video
        const values = [];
        const placeholders = [];

        getDdata[0]?.files.forEach((media, index) => {
          const start = index * 7;

          placeholders.push(
            `($${start + 1}, $${start + 2}, $${start + 3}, $${start + 4}, $${start + 5},$${start + 6},$${start + 7})`,
          );

          values.push(
            productResult?.rows[0]?.id,
            media?.asset_folder,
            media?.secure_url,
            media?.public_id,
            media?.resource_type,
            media?.format,
            media?.original_filename,
          );
        });
        // console.log("values",values)
        // console.log("placeholder",placeholders)

        const mediaQuery = `
            INSERT INTO products_media
            (
          products_id,
          asset_folder,
          secure_url,
          public_id,
          resource_type,
          format,
          original_filename
        )
          VALUES ${placeholders.join(",")}
      `;

        const dat = await client.query(mediaQuery, values);

        // add products variant in productsVarient table query is stat from here

        // 2. Insert add productsVarient
        const valu = [];
        const placeholder = [];

        getDdata[2]?.productsVariants?.forEach((medias, ind) => {
          const strt = ind * 7;

          placeholder.push(
            `($${strt + 1}, $${strt + 2}, $${strt + 3}, $${strt + 4}, $${strt + 5},$${strt + 6},$${strt + 7})`,
          );

          valu.push(
            productResult?.rows[0]?.id,
            medias?.productSize,
            medias?.dairyFarmUnit,
            medias?.productQuantity,
            medias?.sellProductPrice,
            medias?.stockStatus,
            medias?.sku,
          );
        });
        // console.log("values",values)
        // console.log("placeholder",placeholders)

        const productsVariantQuery = `
            INSERT INTO products_variants
            (
          products_id,
          product_size,
          dairyfarm_unit,
          product_quantity,
          sellproduct_price,
          stock_status,
          sku
        )
          VALUES ${placeholder.join(",")}
      `;

        const prodVariant = await client.query(productsVariantQuery, valu);

        // add products variant in products varient table query is stat from here

        // 3. Commit transaction
        await client.query("COMMIT");

        return res.json({
          status: 200,
          message: "product uploaded sucessfully",
        });
      }

      /////////
    } else {
      return res.json({
        status: 500,
        message: "please send valid data",
      });
    }
  } catch (error) {
    console.log("adminAddProductController", error?.message);
    // If any query fails, rollback everything
    await client.query("ROLLBACK");
    // if transaction is fail due to any error and rollback then delte images and video
    // from cloud clodinary is start from here
    try {
      // const {assets}=req?.body
      if (
        req?.body?.length > 0 &&
        req?.body[0]?.files?.length > 0 &&
        req?.body[0]?.files[0]?.asset_folder
      ) {
        const folder = req?.body[0]?.files[0]?.asset_folder;
        // console.log("cloudinar delete folder",folder)

        const data1 = await Promise.all([
          cloudinary.api.delete_resources_by_prefix(folder, {
            resource_type: "image",
          }),

          cloudinary.api.delete_resources_by_prefix(folder, {
            resource_type: "video",
          }),
        ]);
        const data2 = await cloudinary.api.delete_folder(folder);
        // console.log("images and videos",data1)
      }
      // console.log("folder delted",data1)
    } catch (error) {
      console.log(
        "adminDeleteHalfUploadedFileCloudinaryController",
        error?.message,
      );
    }
    // if transaction is fail due to any error and rollback then delte images and video
    // from cloud clodinary is end here

    // if transaction is fail due to any error and rollback then delte images and video
    // from cloud clodinary is start from here
    res.json({ status: 500, message: "server error" });
  } finally {
    // Always release the connection
    client.release();
  }
};

module.exports = { adminAddProductController };
