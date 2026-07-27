const { pool } = require("../../database/db")
const cloudinary=require("../../configFiles/cloudinaryCloudConfig")

const adminDeleteSingleProductController=async(req,res)=>{
    console.log("adminDeleteSingleProductController here",req?.query)
    try{
        if(Object.keys(req?.query)?.length==0 || req?.query== null){
        return res.json({status:500, message:"bad request"})
        }
          const data=await pool?.query('DELETE FROM products WHERE id=$1',[req?.query?.productid])
            if(data?.rowCount==0){
                return res.json({status:500, message:"server error"})
        
            }
           return await deleteSingleProductMediaFromCloudinary(req,res)



    }catch(error){
        console.log("adminDeleteSingleProductController error",error?.message)
        return res.json({status:500, message:"server error"})
    }
}

const deleteSingleProductMediaFromCloudinary=async(req,res)=>{
        try{
            // const {assets}=req?.body
            if(Object.keys(req?.query)?.length==0 || req?.query==null || !req?.query){
                return res.send({status:500 , message:"server error"})
            }
             
            // console.log("dtata",assets)
            const folder =req?.query?.mediaid;
            // console.log("folder",folder)
    
     const data=await Promise.all([
      cloudinary.api.delete_resources_by_prefix(folder, {
        resource_type: "image",
      }),
    
      cloudinary.api.delete_resources_by_prefix(folder, {
        resource_type: "video",
      }),
    ]);
    const data2=await cloudinary.api.delete_folder(folder);
        return res.json({status:200, message:"product delete successfully"})

    //  return res.json({status:200, success:"true"})
    // console.log("images and videos",data)
    // console.log("folder delted",data)
    
        }catch(error){
            console.log("adminDeleteHalfUploadedFileCloudinaryController",error?.message)
        return res.json({status:200, message:"product delete successfully"})

            //  return res.json({status:500,success:"false"})
        }
}

module.exports={adminDeleteSingleProductController}