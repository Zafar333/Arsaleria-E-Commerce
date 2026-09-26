const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserLoginORNotController = async (req, res) => {
  const params = console.log("checkUserLoginORNotController here", req?.query);

  try {
    const userAccessToken = req?.cookies?.userAccessToken;
    const userRefreshtoken = req?.cookies?.userRefreshtoken;
    if (!userAccessToken && !userRefreshtoken) {
      return res.json({ status: 500, login: false });
    }
    const decoded = jwt.verify(
      userAccessToken,
      process.env.USER_JWT_ACCESS_TOKEN_SECRET_KEY,
    );

    res.json({ status: 200, login: true });
  } catch (error) {
    console.log("checkUserLoginORNotController error", error?.message);
    if (error?.name == "TokenExpiredError") {
      res.json({ status: 200, login: true });
    }
    if (error?.name == "JsonWebTokenError") {
      return res.json({ status: 500, login: false });
    }
    return res.json({ status: 500, login: false });
  }
};
module.exports = { checkUserLoginORNotController };
