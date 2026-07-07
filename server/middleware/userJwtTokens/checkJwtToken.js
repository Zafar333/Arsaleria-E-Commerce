
const jwt = require("jsonwebtoken");
require("dotenv").config()

const checkJwtToken=async (req,res,next)=>{

     const accessToken = req.cookies.userAccessToken
     const refreshToken = req.cookies.userRefreshtoken
      // console.log("userAccessToken",token)
    //  return console.log("userRefreshtoken",token2)

  if (!accessToken) {
    return res.status(401).json({status:401, message: "No token please login" });
  }

  try {
    const decoded = jwt.verify(accessToken,process.env.USER_JWT_REFRESH_TOKEN_SECRET_KEY);
    //  console.log("token",decoded)
    // req.user = decoded;
    // next();
  } catch (error) {
    // console.log("error token",error?.message)

    return res.status(401).json({status:500, message: "server error" });
  }


}
module.exports={checkJwtToken}