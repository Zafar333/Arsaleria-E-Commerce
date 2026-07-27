const express=require("express")
const { adminSignup } = require("../../controllers/admin/adminSignupController")
const { adminLogin } = require("../../controllers/admin/adminLoginController")
const { adminResetPassword } = require("../../controllers/admin/adminResetPasswordController")
const { verifyOtp } = require("../../controllers/admin/adminVerifyOtpController")
const { adminProfileDetailController } = require("../../controllers/admin/adminProfileDetailController")
const { checkAdminJwtToken } = require("../../middleware/checkAdminJwtToken")
const { adminAddProductCategoriesController } = require("../../controllers/admin/adminAddProductCategoriesController")
const { adminGetAllCategoriesController } = require("../../controllers/admin/adminGetAllCategoriesController")
const { adminDeleteCategoriesController } = require("../../controllers/admin/adminDeleteCategoriesController")
const { adminGetAllBottomCategoriesController } = require("../../controllers/admin/adminGetAllBottomCategoriesController")
const multer = require("multer");
const { adminGeneratePreSignedUrlAddProductController } = require("../../controllers/admin/adminAddProductControllerfile/adminGeneratePreSignedUrlAddProductController")
const { adminDeleteHalfUploadedFileCloudinaryController } = require("../../controllers/admin/adminAddProductControllerfile/adminDeleteHalfUploadedFileCloudinaryController")
const { adminAddProductController } = require("../../controllers/admin/adminAddProductControllerfile/adminAddProductController")
const { adminGetAllProductsController } = require("../../controllers/admin/AdminGetAllProductsController")
const { adminDeleteSingleProductController } = require("../../controllers/admin/adminDeleteSingleProductController")
const { adminGetInStockProductsController } = require("../../controllers/admin/adminGetInStockProductsController")
const { adminGetOutofStockProductsController } = require("../../controllers/admin/adminGetOutofStockProductsController")
const router=express.Router()

router.post("/signup",adminSignup)
router.post("/login",adminLogin)
router.post("/resetPassword",adminResetPassword)
router.post("/verifyOtp",verifyOtp)
router.get("/profileDetail",adminProfileDetailController)
router.get("/getAllCategories",adminGetAllCategoriesController)
router.post("/addProductCategories",checkAdminJwtToken,adminAddProductCategoriesController)
router.get("/getAllBottomCategories",checkAdminJwtToken,adminGetAllBottomCategoriesController)
router.delete("/deleteCategorie/:id",checkAdminJwtToken,adminDeleteCategoriesController)

// admingetAllProducts route is start from here
router.get("/getAllProducts",checkAdminJwtToken,adminGetAllProductsController)
router.get("/getInStockProducts",checkAdminJwtToken,adminGetInStockProductsController)
router.get("/getOutofStockProducts",checkAdminJwtToken,adminGetOutofStockProductsController)
// admingetAllProducts route is end here


////////////
// admin addproduct  route url is start from here all routes is the part addproduct 
// direct upload from browser first make presigned url from clodinary route is start from here
router.get("/addProductGeneratePreSignedUrl",checkAdminJwtToken,adminGeneratePreSignedUrlAddProductController)
// direct upload from browser first make presigned url from clodinary route is end here

//  half upload data on cloudinary delete request route is start here
router.post("/api/cloudinary/delete-halfUploadedFile",adminDeleteHalfUploadedFileCloudinaryController)
//  half upload data on cloudinary delete request route is end here

// addproduct in to backe route is start from here
router.post("/addProduct",checkAdminJwtToken,adminAddProductController)
// addproduct in to backe route is end here
// admin addproduct all routes is the part addproduct is end here
//////////

// /adminDeleteProduct route is start from here

router.delete("/adminDeleteProduct",checkAdminJwtToken,adminDeleteSingleProductController)

// /adminDeleteProduct route is end here


 




module.exports=router