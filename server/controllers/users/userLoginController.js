const bcrypt = require("bcrypt");
const { pool } = require("../../database/db");
const { checkPassword } = require("../../middleware/checkPassword");
const {
  createJwtAccessToken,
} = require("../../middleware/userJwtTokens/createJwtAccessToken");
const {
  createJwtRefreshToken,
} = require("../../middleware/userJwtTokens/createJwtRefreshToken");
require("dotenv").config();

// user login req controller is start from here
const userLogin = async (req, res) => {
  let data = req?.body;
  try {
    if (Object?.keys(req?.body)?.length > 0 && data?.email && data?.password) {
      let result = await pool?.query(
        `SELECT id,name, email, password FROM users WHERE email=$1`,
        [data?.email],
      );
      //  return console.log("result",result)
      if (result?.rows?.length > 0) {
        let match = await checkPassword(
          data?.password,
          result?.rows[0]?.password,
        );
        if (match) {
          //  CREATE REFRESH and ACCESS JWT TOKEN FUN IS START FROM HERE
          const accesstoken = await createJwtAccessToken(
            result?.rows[0],
            process.env.USER_JWT_ACCESS_TOKEN_SECRET_KEY,
          );
          const refreshtoken = await createJwtRefreshToken(
            result?.rows[0],
            process.env.USER_JWT_REFRESH_TOKEN_SECRET_KEY,
          );

          if (!refreshtoken || !accesstoken) {
            return res.json({ status: 400, message: "server error" });
          }

          const dat = await pool?.query(
            `UPDATE users SET user_jwt_refereshToken=$1 WHERE id=$2`,
            [refreshtoken, result?.rows[0]?.id],
          );

          if (dat?.rowCount == 0) {
            return res.json({ status: 500, message: "server error" });
          }

          //  CREATE REFRESH and ACCESS JWT TOKEN FUN IS end HERE

          if (refreshtoken && accesstoken) {
            // ✅ Set Token in Cookie
            res.cookie("userRefreshtoken", refreshtoken, {
              httpOnly: true, // prevent XSS attacks
              secure: false, // true in production (HTTPS)
              sameSite: "lax", // CSRF protection
              // maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            res.cookie("userAccessToken", accesstoken, {
              httpOnly: true, // prevent XSS attacks
              secure: false, // true in production (HTTPS)
              sameSite: "lax", // CSRF protection
              // maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            return res.json({
              status: 200,
              message: "you login successfull",
              id: result?.rows[0]?.id,
              name: result?.rows[0]?.name,
              useraccesstoken: accesstoken,
            });
          }
        } else {
          return res.json({
            message: "Email or password is incorrect",
            status: 400,
          });
        }
      } else {
        return res.json({
          status: 400,
          message: "Email or password is incorrect",
        });
      }
    } else {
      return res.json({ message: "invalid credentials", status: 400 });
    }
  } catch (err) {
    console.log("user login page controller error", err?.message);
    return res.json({ status: 500, message: "server error" });
  }
};
// user login req controller is end here

module.exports = { userLogin };
