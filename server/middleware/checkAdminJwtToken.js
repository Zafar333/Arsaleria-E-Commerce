const jwt = require("jsonwebtoken");
const { pool } = require("../database/db");
const { createJwtAccessToken } = require("./userJwtTokens/createJwtAccessToken");


require("dotenv").config()


const checkAdminJwtToken = async (req, res, next) => {
  const adminAccessToken = req.cookies?.AdminAccessToken;
  const adminRefreshToken = req.cookies?.AdminRefreshToken;
  try {


    // ===============================
    // 1. No refresh token → force login
    // ===============================
    if (!adminAccessToken || adminAccessToken == "undefined" || !adminRefreshToken || adminRefreshToken == "undefined") {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "No session found. Please login again.",
      });
    }
    // ===============================

    // 2. Verify access token (if valid → continue)
    // ===============================
    if (adminAccessToken) {
      try {

        const decoded = jwt.verify(
          adminAccessToken,
          process.env.ADMIN_JWT_ACCESS_TOKEN_SECRET_KEY
        );

        return next();

      } catch (error) {
        if (error?.name == "TokenExpiredError") {
          // if acces token is expired then check refersh token
          try {
            // console.log("access error token", error?.message)
            if (adminRefreshToken) {
              const refreshtkn = jwt.verify(
                adminRefreshToken,
                process.env.ADMIN_JWT_REFRESH_TOKEN_SECRET_KEY
              );
              const result = await pool.query(`SELECT admin_jwt_refereshToken,id,email FROM admin WHERE admin_jwt_refereshToken=$1`, [adminRefreshToken])
              if (result?.rows?.length < 1) {

                res.clearCookie("AdminAccessToken");
                res.clearCookie("AdminRefreshToken");

                return res.json({
                  status: 401,
                  success: false,
                  message: "No session found. Please login again.",
                });
              }
              const accestokn = await createJwtAccessToken(result?.rows[0], process.env.ADMIN_JWT_ACCESS_TOKEN_SECRET_KEY)
              if (!accestokn) {

                return res.json({ status: 500, message: "server error" })
              }
              res?.cookie("AdminAccessToken", accestokn, {
                httpOnly: true,
                secure: false, // Set to true in production with HTTPS
                // maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: "lax"
              });
              // return console.log("refersh result", result?.rows[0])

              return next()


            }
          } catch (error) {
            // refersh TokenExpiredError catch block is start here
            if (error?.name == "TokenExpiredError") {
              const result = await pool.query(`UPDATE admin SET admin_jwt_refereshToken=NULL WHERE admin_jwt_refereshToken=$1`, [adminRefreshToken])
              // console.log("refersh expired error token", result)
              if (result?.rowCount == 0) {
                res.clearCookie("AdminAccessToken");
                res.clearCookie("AdminRefreshToken");
                return res.send({ status: 401, success: false, message: "No session found. Please login again." })
              }
              // return console.log("update refersh result", result?.rowCount)

              res.clearCookie("AdminAccessToken");
              res.clearCookie("AdminRefreshToken");
              return res.json({
                status: 401,
                success: false,
                message: "No session found. Please login again.",
              });
            }

            if (error?.name == "JsonWebTokenError") {
              const result = await pool.query(`UPDATE admin SET admin_jwt_refereshToken=NULL WHERE admin_jwt_refereshToken=$1`, [adminRefreshToken])
              if (result?.rowCount < 1) {
                res.clearCookie("AdminAccessToken");
                res.clearCookie("AdminRefreshToken");
                return res.send({ status: 401, success: false, message: "No session found. Please login again." })
              }
              // console.log("refersh error token", error?.message)
              res.clearCookie("AdminAccessToken");
              res.clearCookie("AdminRefreshToken");
              return res.json({
                status: 401,
                success: false,
                message: "No session found. Please login again.",
              });
              // expired token logic
            }
            // refersh TokenExpiredError and JsonWebTokenError catch block is end here


          }

          // return res.send({status:401})
          // expired token logic
        }


      }
    }

    // ===============================
  } catch (error) {
    // console.log("i am catch", error?.message)

    return res.send({ status: 500, message: "server error" })
  }

}

module.exports = { checkAdminJwtToken }