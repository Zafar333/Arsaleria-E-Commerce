const bcrypt =require("bcrypt")
const checkPassword=async(newPass,oldPass)=>{
    if(newPass&&oldPass){
        let match=await bcrypt.compare(newPass,oldPass)
       return match
    }

}

module.exports={checkPassword}