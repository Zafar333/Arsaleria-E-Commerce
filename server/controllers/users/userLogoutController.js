const { pool } = require("../../database/db");

const userLogoutController = async (req, res) => {
  // console.log("id", req?.query);
  try {
    if (
      Object?.keys(req?.query)?.length == 0 ||
      !req?.query?.userLogout ||
      !req?.query?.id
    ) {
      return res.json({ status: 500, message: "invalid request" });
    }
    const result = await pool.query(
      `UPDATE users
      SET
      user_jwt_refereshToken = $1
      WHERE id = $2
  
  `,
      [null, req?.query?.id],
    );
    if (result?.rowCount.length == 0) {
      return res.json({ status: 500, message: "server error" });
    }

    await res.clearCookie("userAccessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    await res.clearCookie("userRefreshtoken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.json({ status: 200, message: "user logout successfully" });
  } catch (error) {
    console.log("userlogout error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { userLogoutController };
