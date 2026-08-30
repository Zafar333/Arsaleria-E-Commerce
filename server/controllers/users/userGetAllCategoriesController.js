const { pool } = require("../../database/db");

const userGetAllCategoriesController = async (req, res) => {
  try {
    const result = await pool.query(
      `   SELECT id,category_name,is_parent,parent_id,isactive_category From product_categories
        `,
    );

    if (result?.rows?.length < 1) {
      return res.json({ status: 200, data: [] });
    }

    return res.json({
      status: 200,
      data: result?.rows,
    });
  } catch (error) {
    console.log("userGetAllCategoriesController error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { userGetAllCategoriesController };
