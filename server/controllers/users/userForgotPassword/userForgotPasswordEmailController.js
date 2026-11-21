const { pool } = require("../../../database/db");
const { generateOtpFun } = require("../../../middleware/generateOtpFun");
const { sendOtpMail } = require("../../../middleware/sendOtpMail");
const validator = require("validator");

const userForgotPasswordEmailController = async (req, res) => {
  try {
    if (
      typeof req?.body?.email !== "string" ||
      Object.keys(req?.body)?.length == 0 ||
      !req?.body?.email
    ) {
      return res.status(400).json({
        status: 500,
        message: "Invalid input data.",
      });
    }
    const cleanEmail = req?.body?.email.trim();
    if (!cleanEmail) {
      return res.json({ status: 500, message: "invalid data" });
    }

    // Email format validation start here
    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({
        status: 500,
        message: "Please provide a valid email address.",
      });
    }
    // Email format validation end here

    //     // Prevent invalid email header values
    if (/[\r\n]/.test(cleanEmail)) {
      return res.json({
        status: 500,
        message: "Invalid email address.",
      });
    }

    let findEmail = await pool?.query(
      `SELECT id, email FROM users WHERE email=$1`,
      [cleanEmail],
    );
    if (findEmail?.rows?.length == 0) {
      return res.json({ status: 401, message: "user not exist" });
    }

    // generate otp fun is call here
    let otp = await generateOtpFun();
    if (!otp) {
      return res.json({ status: 500, message: "server error" });
    }
    // return console.log("otp",otp)
    // generate otp fun is call end here

    // const OTP_STORE = {}
    // OTP_STORE[data?.email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 mins expiry
    let info = await sendOtpMail(cleanEmail, otp, res);
    // return console.log("information",info)

    if (info?.rejected?.length > 0) {
      return res?.json({ status: 500, message: "server error" });
    }
    res.cookie("userResetPasswordOtp", otp, {
      httpOnly: true, // prevent XSS attacks
      secure: false, // true in production (HTTPS)
      sameSite: "strict", // CSRF protection
      // path: "/",
      // maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.cookie("userid", findEmail?.rows[0]?.id, {
      httpOnly: true, // prevent XSS attacks
      secure: false, // true in production (HTTPS)
      sameSite: "strict", // CSRF protection
      // path: "/",
      // maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    return res?.json({
      status: 200,
      message: "please check email and enter your otp is here",
    });
  } catch (error) {
    console.log("userResetPasswordEmailController", error.message);
    return res.send({ status: 500, message: "server error" });
  }
};

module.exports = { userForgotPasswordEmailController };
