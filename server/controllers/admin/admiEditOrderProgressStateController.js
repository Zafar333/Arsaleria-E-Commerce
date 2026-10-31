const { pool } = require("../../database/db");

const admiEditOrderProgressStateController = async (req, res) => {
  console.log(" admiEditOrderProgressStateController here");

  try {
    if (
      Object.keys(req?.query)?.length == 0 ||
      !req?.query?.id ||
      !req?.query?.orderProgressState
    ) {
      return res.json({ status: 500, message: "invalid request" });
    }

    const result = await pool.query(
      `UPDATE orders SET order_status=$1 WHERE id=$2`,
      [req?.query?.orderProgressState, Number(req?.query?.id)],
    );
    if (result?.rowCount == 0) {
      return res?.json({ status: 500, message: "server error" });
    }
    return res.json({
      status: 200,
      message: "order progress status changed successfully",
    });
  } catch (error) {
    console.log("admiEditOrderProgressStateController error", error?.message);
    return res.json({ status: 500, message: "server error" });
  }
};

module.exports = { admiEditOrderProgressStateController };
