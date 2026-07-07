
const userForgotPasswordVerifyOtpController = (req,res) => {
    // console.log("hell")

    
    try{
        // console.log("userResetPasswordVerifyOtpController",req.cookies?.userResetPasswordOtp)
        if(!req?.body?.otps || !req.cookies?.userResetPasswordOtp ){
            return res.json({status:400,message:"inavlid credentials"})
        }
        if(req?.body?.otps!=req.cookies?.userResetPasswordOtp){

            return res.json({status:400, message:"otp is invalid"})
        }
            return res.json({status:200, message:"otp is matched"})




    }catch(error){
        // console.log("userResetPasswordVerifyOtpController",error.message)
        res.json({status:500,message:"server error"})
    }

}

module.exports= {userForgotPasswordVerifyOtpController}