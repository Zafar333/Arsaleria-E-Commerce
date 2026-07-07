const nodemailer = require("nodemailer");
const { generateOtpFun } = require("./generateOtpFun");

require("dotenv").config()

const sendOtpMail=async(userEmail,otp)=>{
    // console.log("mailreq",req.body)
    let testAccount=await nodemailer.createTestAccount();

// craete a connetion emtp server is start from here
const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user:"arslanz499@gmail.com",
        pass: process.env.PASSWORD
    },

  });
  
// craete a connetion emtp server is end here



// send mail with defined transport object is start from here
try{

   const info = await transporter.sendMail({
    from: {name:"Arsaleria",address:"arslanz499@gmail.com"}, // sender address
    // to: "syedhaideralishah79@gmail.com", // list of receivers
    to: `${userEmail}`, // list of receivers
    subject: "Your Password Reset Otp", // Subject line
    // text: "Your Password reset otp : 89898", // plain text body
    html: `<h1 >Your Password reset otp : ${otp}</h1>`, // html body
  });

//   console.log("Message sent: %s", info);
  if(info?.rejected?.length==0){
    // res.json({message:"Email send sucessfully"})
    return info
  }
// send mail with defined transport object is end here

}
catch(error){
    return (error?.message)
}

}

module.exports={sendOtpMail};