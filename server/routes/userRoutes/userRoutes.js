const express=require("express")
const { stripePaymentController } = require("../../controllers/users/stripepaymentcontroller")
const { userSignup } = require("../../controllers/users/userSignupController")
const { userLogin } = require("../../controllers/users/userLoginController")
const { profileController } = require("../../controllers/users/userController")
const { checkJwtToken } = require("../../middleware/userJwtTokens/checkJwtToken")
const { userUpdateForgotPasswordController } = require("../../controllers/users/userForgotPassword/userUpdateForgotPasswordController")
const { userForgotPasswordEmailController } = require("../../controllers/users/userForgotPassword/userForgotPasswordEmailController")
const {userForgotPasswordVerifyOtpController} = require("../../controllers/users/userForgotPassword/userforgotPasswordVerifyOtpController")
const { signinWithGoogleLoginController } = require("../../controllers/users/signinwithgooglelogincontroller")
const router=express.Router()

// login,signup and authentication routes is start from herer
router.post("/signup",userSignup)
router.post("/login",userLogin)
router.post("/signinWithGoogle",signinWithGoogleLoginController)
router.post("/checkToken",checkJwtToken)
router.post("/resetPassword/sendOtpEmail",userForgotPasswordEmailController)
router.post("/resetPassword/verifyOtp",userForgotPasswordVerifyOtpController)
router.post("/updateForgotPassword",userUpdateForgotPasswordController)
// login,signup and authentication routes is start from herer



router.post("/profile",profileController)
router.post("/create-payment-intent",stripePaymentController)
module.exports=router