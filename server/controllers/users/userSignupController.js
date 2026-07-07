const bcrypt=require("bcrypt");
const { pool } = require("../../database/db");
require('dotenv').config()


// user Singup req is start from here


 const userSignup=async(req,res)=>{
    console.log("hello user signup")

    let data=req?.body
    try{
    if(data?.name && data?.email && data?.password){

         // 🔍 Check if email already exists
    const checkUser = await pool.query(
        `SELECT id email FROM users WHERE email = $1`,
        [data?.email]
      );
  
      if (checkUser?.rows?.length > 0) {
        return res.status(400).json({ message: "Email already exist",status:400 });
         }
         // 🔍 Check if email already exists is end here

        const hashPassword=await bcrypt.hash(data?.password,10)
        if(hashPassword){
           let result=await pool.query(`INSERT INTO users (name,email,password) values($1,$2,$3)`,[data?.name,data?.email,hashPassword])
         //   console.log("result",result?.rowCount)
           if(result?.rowCount>0){
           res.json({status:"200", message:"User Register Sucessfully"})
           }
            }
         }else{
            res?.json({status:"400",message:"please send valid credentials"})
         }
     }
    catch(err){
        console.log("user signup page controller error",err?.message)
       return res.send({status:500,message:"server error"})
       }
}

module.exports={userSignup}
