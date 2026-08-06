const { pool } = require("../../database/db")
const { checkPassword } = require("../../middleware/checkPassword")
const { createJwtAccessToken } = require("../../middleware/userJwtTokens/createJwtAccessToken")
const { createJwtRefreshToken } = require("../../middleware/userJwtTokens/createJwtRefreshToken")
require("dotenv").config()

const adminLogin = async (req, res) => {
    let data = req?.body
    try {
        if (data?.email && data?.password) {
            // console.log("adminLogin", data)
            let checkUser = await pool.query(`SELECT * FROM admin WHERE email=$1`, [data?.email])
            if (checkUser?.rows?.length > 0) {
                let match = await checkPassword(data?.password, checkUser?.rows[0]?.password)
                if (match == true) {
                    const adminaccesstoken = await createJwtAccessToken(checkUser?.rows[0], process.env.ADMIN_JWT_ACCESS_TOKEN_SECRET_KEY)
                    const adminrefreshtoken = await createJwtRefreshToken(checkUser?.rows[0], process.env.ADMIN_JWT_REFRESH_TOKEN_SECRET_KEY)
                    if (!adminaccesstoken || !adminrefreshtoken) {

                        return res.json({ status: 500, message: "server error" })
                    }

                    const save = await pool.query(`UPDATE admin SET admin_jwt_refereshToken=$1 WHERE id=$2 `,
                        [adminrefreshtoken, checkUser?.rows[0]?.id])
                    // return res.json({ status: 200, message: "user is already login" })
                    if (save?.rowCount == 0) {
                        return res.json({ status: 500, message: "server error" })

                    }

                    res?.cookie("AdminAccessToken", adminaccesstoken, {
                        httpOnly: true,
                        secure: false, // Set to true in production with HTTPS
                        // maxAge: 24 * 60 * 60 * 1000, // 1 day
                        sameSite: "lax"
                    });
                    res?.cookie("AdminRefreshToken", adminrefreshtoken, {
                        httpOnly: true,
                        secure: false, // Set to true in production with HTTPS
                        // maxAge: 24 * 60 * 60 * 1000, // 1 day
                        sameSite: "lax"
                    });
                    // console.log("newtoken",newToken)
                    let data = { id: checkUser?.rows[0]?.id, name: checkUser?.rows[0]?.name, email: checkUser?.rows[0]?.email }
                    return res?.json({ status: 200, message: "You Login Sucessfully", id:data?.id, adminaccestoken:adminaccesstoken })

                } else {
                    return res?.json({ status: "400", message: "Email or password is incorrect" })
                }
            } else {
                return res?.json({ status: "400", message: "Email or password is incorrect" })
            }
        } else {
            return res?.json({ status: "400", message: "please send valid data" })
        }
    } catch (error) {
        console.log("catch error",error?.message)
        return res?.json({ status:500, message: "server error" })
    }

}
module.exports = { adminLogin }