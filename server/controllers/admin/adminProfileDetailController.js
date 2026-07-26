const { pool } = require("../../database/db")

const adminProfileDetailController = async (req, res) => {
    const id = req?.query?.id

    try {
        if  (!req?.query || !req?.query==null || Object.keys(req?.query)?.length == 0 || !id  || id == "undefined") {
            return res.send({ status: 400, message: "invalid request" })
        }
        const result = await await pool.query(`SELECT id,name FROM admin WHERE id=$1`, [id])

        if (result?.rows?.length < 1) {
            return res.send({ status: 401, message: "invalid request" })
        }

        return res.send({ status: 200, data: result?.rows })
    } catch (error) {
        console.log("errors", error?.message)
        res?.send({ status: 500, message: "server error" })

    }

}
module.exports = { adminProfileDetailController }
