const jwt=require("jsonwebtoken")
const createJwtAccessToken=async(data,secretKey)=>{
    const token=await jwt.sign({id:data?.id,email:data?.email},secretKey,{ expiresIn: "4h" })
    // console.log("datatoken",token)

   return token

    
}
module.exports ={createJwtAccessToken}