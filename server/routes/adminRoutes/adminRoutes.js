const express=require("express")
const { adminSignup } = require("../../controllers/admin/adminSignupController")
const { adminLogin } = require("../../controllers/admin/adminLoginController")
const { adminResetPassword } = require("../../controllers/admin/adminResetPasswordController")
const { verifyOtp } = require("../../controllers/admin/adminVerifyOtpController")
const { adminProfileDetailController } = require("../../controllers/admin/adminProfileDetailController")
const { checkAdminJwtToken } = require("../../middleware/checkAdminJwtToken")
const { adminAddProductCategoriesController } = require("../../controllers/admin/adminAddProductCategoriesController")
const { adminGetAllCategoriesController } = require("../../controllers/admin/adminGetAllCategoriesController")

const router=express.Router()

router.post("/signup",adminSignup)
router.post("/login",adminLogin)
router.post("/resetPassword",adminResetPassword)
router.post("/verifyOtp",verifyOtp)
router.get("/profileDetail",adminProfileDetailController)
router.get("/getAllCategories",adminGetAllCategoriesController)
router.post("/addProductCategories",checkAdminJwtToken,adminAddProductCategoriesController)

module.exports=router