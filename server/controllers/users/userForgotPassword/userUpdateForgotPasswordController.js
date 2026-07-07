const bcrypt = require("bcrypt");
const { pool } = require("../../../database/db")

const userUpdateForgotPasswordController = async (req, res) => {
    const { userResetPasswordOtp, userid } = req?.cookies
    const { password, confirmPassword } = req?.body
    try {
        if (!password || !confirmPassword || !userResetPasswordOtp || !userid) {
            return res.send({ status: 400, message: "please send valid credentials" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const data = await pool.query(`UPDATE users SET password=$1 WHERE id = $2;`, [hashPassword, userid])
        if (data?.rowCount.length == 0) {


            return res.send({ status: 400, message: "user is not valid" })
        }
        res.clearCookie("userResetPasswordOtp")
        res.clearCookie("userid")
        return res.send({ status: 200, message: "password update successfully" })
        //  console.log("userUPDATEFORGOTPasswordController",req.body)
    } catch (error) {
        console.log(error?.message)
        res.send({ status: 500, message: "server error" })
    }

}

module.exports = { userUpdateForgotPasswordController }