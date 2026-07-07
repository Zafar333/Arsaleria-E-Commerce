const { pool } = require("../../database/db")

const adminAddProductCategoriesController = async (req, res) => {
    const data = req?.body
    try {
        if (!data?.categoryName && !data?.isParent && !data?.isActiveCategory) {

            return res.send({ status: 500, message: "server error" })
        }
        const result = await pool.query(`INSERT INTO product_categories (category_name, is_parent, isactive_category,parent_id)
   VALUES ($1,$2,$3,$4)`, [data?.categoryName, data?.isParent, data?.isActiveCategory, data?.parentId])
        if (result?.rowCount == 0) {
            return res.send({ status: 500, message: "server error" })

        }
        return res.send({ status: 200, message: "category updated sucessfully" })

    } catch (error) {
        console.log("error messages", error?.message)
        return res.send({ status: 500, message: "server error" })
    }

}

module.exports = { adminAddProductCategoriesController }