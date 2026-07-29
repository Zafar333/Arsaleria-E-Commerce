const { pool } = require("../../database/db");

const getSearchCustomersFilterDataController = async (req, res) => {
//    return console.log("getSearchCustomersFilterDataController here",req?.query?.name)
  try {
    if (
      Object.keys(req?.query)?.length == 0 ||
      !req?.query ||
      !req?.query?.name
    ) {
      return res?.json({ status: 500, message: "please send valid data" });
    }

    const result=await pool.query(`SELECT id,key,name,email,TO_CHAR(created_date, 'DD-MM-YYYY') AS created_date
        FROM users
        WHERE name ILIKE $1          
        `,[ `${req?.query?.name}%`]);



    if (result?.rows?.length < 1) {
      return res.json({ status: 400, message: "No Customer found" });
    }
    return res.json({ status: 200, data: result?.rows });
  } catch (error) {
    console.log("errors", error?.message);
    res?.send({ status: 500, message: "server error" });
  }
};

module.exports = { getSearchCustomersFilterDataController };
