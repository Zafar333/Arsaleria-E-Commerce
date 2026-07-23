const { pool } = require("../../database/db")

const adminGetAllBottomCategoriesController = async(req,res) => {
    // console.log("adminGetAllBottomCategoriesController here")
      try{
    // console.log("delete categorie controller",deleteId)
    // if(!deleteId){
    //     return res.json({status:500, message:"server error"})
    // }
    const data=await pool.query('SELECT * FROM product_categories WHERE is_parent=$1',[false])
  
    return res.json({status:200, data:data?.rows})



    }catch(error){
        console.log("adminGetAllBottomCategoriesController",error?.message)
        return res.json({status:500, message:"server error"})
    } 
  
}

module.exports={adminGetAllBottomCategoriesController}