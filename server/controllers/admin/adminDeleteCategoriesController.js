const { pool } = require("../../database/db")

const adminDeleteCategoriesController = async(req,res) => {
    const deleteId=req?.params?.id
    try{
    // console.log("delete categorie controller",deleteId)
    if(Object.keys(req?.params)?.length==0 || !deleteId){
        return res.json({status:500, message:"server error"})
    }
    const data=await pool?.query('DELETE FROM product_categories WHERE id=$1',[deleteId])
    if(data?.rowCount==0){
        return res.json({status:500, message:"server error"})

    }
    return res.json({status:200, message:"category delete sucessfully"})


    }catch(error){
        console.log("admindeletecategorycontroller",error?.message)
        res.json({status:500, message:"server error"})
    } 

}

module.exports = { adminDeleteCategoriesController }