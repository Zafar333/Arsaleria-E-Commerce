const verifyOtp=async(req,res)=>{
    try{
        const { email, otp } = req.body;
        const record = OTP_STORE[email];
      
        if (!record) {
            return res.status(400).json({ message: "OTP not found" });
        }
        if (Date.now() > record.expiresAt){
          return res.json({status:"400", message: "OTP expired" });
        }
      
        if (record.otp !== otp){
          return res.json({status:400, message: "Invalid OTP" });
        }
      
        // OTP verified
        const OTP_STORE={}
        delete OTP_STORE[email]; // Clear OTP
        res.json({ message: "OTP verified successfully" });
    }catch(error){
        res.json(error?.message)
    }

}
module.exports={verifyOtp}