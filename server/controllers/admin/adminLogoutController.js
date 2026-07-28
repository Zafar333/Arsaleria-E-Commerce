const { pool } = require("../../database/db");

const adminLogoutController = async (req,res) => {
    
  try {
    if (
      Object.keys(req?.query)?.length == 0 ||
      !req?.query?.adminLogout ||
      !req?.query?.id
    ) {
      return res.json({ status: 500, message: "invalid request" });
    }
    const result = await pool.query(
      `UPDATE admin
      SET
      admin_jwt_refereshToken = $1
      WHERE id = $2
  
  `,[null, req?.query?.id]);
    if (result?.rowCount.length == 0) {
      return res.json({ status: 500, message: "server error" });
    }
    await res.clearCookie("AdminAccessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    await res.clearCookie("AdminRefreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.json({ status: 200, message: "logout successfully" });
  } catch (error) {
    console.log("adminlogout error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { adminLogoutController };
