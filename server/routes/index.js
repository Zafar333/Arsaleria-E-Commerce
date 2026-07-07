const express=require("express");
const user=require("./userRoutes/userRoutes.js")
const adminRoutes=require("./adminRoutes/adminRoutes.js")

const router=express.Router()

module.exports=()=>{
    router.use("/admin",adminRoutes)
    router.use("/user",user)
    return router
}