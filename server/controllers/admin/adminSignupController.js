const { pool } = require("../../database/db")
const bcrypt=require("bcrypt")


const adminSignup=async(req,res)=>{
    let admin_type="admin"
    let saltRounds=9
    let data=req?.body
    try{
        if(data?.name && data?.email && data?.password){
        let checkUser=await pool.query(`SELECT * FROM admin WHERE email=$1`,[data?.email])
        if(checkUser?.rows?.length > 0){
            return res?.json({status:"400",message:"Email already exist"})
        }
          const hashPassword=await bcrypt.hash(data?.password,saltRounds)
                if(hashPassword){
                   let result=await pool.query(`INSERT INTO admin (name,email,password,admin_type) values($1,$2,$3,$4)`,[data?.name,data?.email,hashPassword,admin_type])
                //    console.log("result",result?.rowCount)
                   if(result?.rowCount>0){
                   res.json({status:"200", message:"you are register Sucessfully"})
                   }
                    }
                }else{
                    res?.json({status:"400",message:"please send valid credentials"})
                }         

    }catch (error){
        res?.json({error:error,message:"server error",status:"500"})
    }
}

module.exports={adminSignup}