const { pool } = require("../../database/db")

const adminDeleteUserController = async(req,res) => {
     const deleteId=req?.params?.userid
    try{
    // console.log("delete categorie controller",deleteId)
    if(Object.keys(req?.params)?.length==0 || !deleteId || !req?.params?.userid){
        return res.json({status:500, message:"invalid data"})
    }
    const data=await pool?.query('DELETE FROM users WHERE id=$1',[deleteId])
    if(data?.rowCount==0){
        return res.json({status:500, message:"server error"})

    }
     await res.clearCookie("userRefreshtoken");
     await res.clearCookie("userAccessToken");
    return res.json({status:200, message:"user delete sucessfully"})


    }catch(error){
        console.log("adminDeleteUserController",error?.message)
        res.json({status:500, message:"server error"})
    } 
 
}

module.exports={adminDeleteUserController}