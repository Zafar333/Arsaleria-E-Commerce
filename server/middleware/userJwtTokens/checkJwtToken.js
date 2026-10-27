const jwt = require("jsonwebtoken");
const { pool } = require("../../database/db");
const { createJwtAccessToken } = require("./createJwtAccessToken");

require("dotenv").config();

const checkJwtToken = async (req, res, next) => {
  const usrAccessToken = req.cookies?.userAccessToken;
  const usrRefreshToken = req.cookies?.userRefreshtoken;
  try {
    // ===============================
    // 1. No refresh token → force login
    // ===============================
    if (
      !usrAccessToken ||
      usrAccessToken == "undefined" ||
      !usrRefreshToken ||
      usrRefreshToken == "undefined"
    ) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "No session found. Please login again.",
      });
    }
    // ===============================

    // 2. Verify access token (if valid → continue)
    // ===============================
    if (usrAccessToken) {
      try {
        const decoded = jwt.verify(
          usrAccessToken,
          process.env.USER_JWT_ACCESS_TOKEN_SECRET_KEY,
        );

        return next();
      } catch (error) {
        if (error?.name == "TokenExpiredError") {
          // if acces token is expired then check refersh token
          try {
            // console.log("access error token", error?.message)
            if (usrRefreshToken) {
              const refreshtkn = jwt.verify(
                usrRefreshToken,
                process.env.USER_JWT_REFRESH_TOKEN_SECRET_KEY,
              );
              const result = await pool.query(
                `SELECT user_jwt_refereshtoken,id,email FROM users WHERE user_jwt_refereshtoken=$1`,
                [usrRefreshToken],
              );
              if (result?.rows?.length < 1) {
                res.clearCookie("userAccessToken");
                res.clearCookie("userRefreshtoken");

                return res.json({
                  status: 401,
                  success: false,
                  message: "No session found. Please login again.",
                });
              }
              const accestokn = await createJwtAccessToken(
                result?.rows[0],
                process.env.USER_JWT_ACCESS_TOKEN_SECRET_KEY,
              );
              if (!accestokn) {
                return res.json({ status: 500, message: "server error" });
              }
              res?.cookie("userAccessToken", accestokn, {
                httpOnly: true,
                secure: false, // Set to true in production with HTTPS
                // maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: "lax",
              });
              // return console.log("refersh result", result?.rows[0])

              return next();
            }
          } catch (error) {
            // refersh TokenExpiredError catch block is start here
            if (error?.name == "TokenExpiredError") {
              const result = await pool.query(
                `UPDATE users SET user_jwt_refereshtoken=NULL WHERE user_jwt_refereshtoken=$1`,
                [usrRefreshToken],
              );
              // console.log("refersh expired error token", result)
              if (result?.rowCount == 0) {
                res.clearCookie("userAccessToken");
                res.clearCookie("userRefreshtoken");
                return res.send({
                  status: 401,
                  success: false,
                  message: "No session found. Please login again.",
                });
              }
              // return console.log("update refersh result", result?.rowCount)

              res.clearCookie("userAccessToken");
              res.clearCookie("userRefreshtoken");
              return res.json({
                status: 401,
                success: false,
                message: "No session found. Please login again.",
              });
            }

            if (error?.name == "JsonWebTokenError") {
              const result = await pool.query(
                `UPDATE users SET user_jwt_refereshtoken=NULL WHERE user_jwt_refereshtoken=$1`,
                [usrRefreshToken],
              );
              if (result?.rowCount < 1) {
                res.clearCookie("userAccessToken");
                res.clearCookie("userRefreshtoken");
                return res.send({
                  status: 401,
                  success: false,
                  message: "No session found. Please login again.",
                });
              }
              // console.log("refersh error token", error?.message)
              res.clearCookie("userAccessToken");
              res.clearCookie("userRefreshtoken");
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

    return res.send({ status: 500, message: "server error" });
  }
};

module.exports = { checkJwtToken };
