const { pool } = require("../../database/db");
const { generateOtpFun } = require("../../middleware/generateOtpFun");
const { sendOtpMail } = require("../../middleware/sendOtpMail");
require("dotenv").config();


const adminResetPassword=async(req,res)=>{
    let data=req?.body
    try{
        if(data?.email ){
                    let checkUser=await pool?.query(`SELECT * FROM admin WHERE email=$1`,[data?.email])
                    if(checkUser?.rows?.length>0){
                       // generate otp fun is call here
                        let otp=await generateOtpFun()
                        // generate otp fun is call end here

                         const OTP_STORE={}
                         OTP_STORE[data?.email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 mins expiry
                        let info=await sendOtpMail(data?.email,otp)
                        // console.log("information",info)
                        
                        if(info?.rejected?.length==0){

                            res?.json({status:200,message:"please check email and enter your otp is here"})
                        }
                        // let match =await checkPassword(data?.password,checkUser?.rows[0]?.password)
                        // if(match==true){
                    }else{
                        res?.json({status:400,message:"user not found"})
                    }
                }else{
                    res?.json({status:400,message:"please send valid data"})}
                                  
 }catch(error){
        res?.json(error?.message)
    }

}
module.exports={adminResetPassword}