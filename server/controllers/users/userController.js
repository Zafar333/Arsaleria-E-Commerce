const bcrypt=require("bcrypt")


// prifileFunController is start from here
const profileController=(req,res)=>{
    console.log("cookies",req?.cookies.auth_token)

}

// prifileFunController is end here

module.exports = {
    profileController
};
