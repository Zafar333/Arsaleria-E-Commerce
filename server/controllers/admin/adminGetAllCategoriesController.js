const { pool } = require("../../database/db")

const adminGetAllCategoriesController = async (req, res) => {
    // const data = req?.body
    try {
       
        const result = await pool.query(`SELECT * FROM product_categories`) 
        if (result?.rows.length == 0) {
            return res.send({ status: 500, message: "server error" })

        }
        return res.send({ status: 200, data:result?.rows })

    } catch (error) {
        console.log("error messages", error?.message)
        return res.send({ status: 500, message: "server error" })
    }

}

module.exports = { adminGetAllCategoriesController }