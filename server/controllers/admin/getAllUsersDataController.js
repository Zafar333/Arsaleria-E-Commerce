const { pool } = require("../../database/db")

const getAllUsersDataController =async (req,res) => {
        try {
       
        const result = await pool.query(`SELECT id,key,name,email,TO_CHAR(created_date, 'DD-MM-YYYY') AS created_date FROM users`) 
        if (result?.rows.length == 0) {
            return res.send({ status:200, message: "No Customer found", data:[] })

        }
        return res.send({ status: 201, data:result?.rows })

    } catch (error) {
        console.log("getAllCustomersDataController error messages", error?.message)
        return res.send({ status: 500, message: "server error" })
    }
 
}

module.exports={getAllUsersDataController}