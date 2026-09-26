const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwtRefreshToken = async (data, secretKey) => {
  const token = jwt.sign({ id: data?.id, email: data?.email }, secretKey, {
    expiresIn: "1d",
  });
  // console.log("refershtoken",token)
  return token;
};
module.exports = { createJwtRefreshToken };
