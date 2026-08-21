const express = require("express");
const {
  adminSignup,
} = require("../../controllers/admin/adminSignupController");
const { adminLogin } = require("../../controllers/admin/adminLoginController");
const {
  adminResetPassword,
} = require("../../controllers/admin/adminResetPasswordController");
const {
  verifyOtp,
} = require("../../controllers/admin/adminVerifyOtpController");
const {
  adminProfileDetailController,
} = require("../../controllers/admin/adminProfileDetailController");
const { checkAdminJwtToken } = require("../../middleware/checkAdminJwtToken");
const {
  adminAddProductCategoriesController,
} = require("../../controllers/admin/adminAddProductCategoriesController");
const {
  adminGetAllCategoriesController,
} = require("../../controllers/admin/adminGetAllCategoriesController");
const {
  adminDeleteCategoriesController,
} = require("../../controllers/admin/adminDeleteCategoriesController");
const {
  adminGetAllBottomCategoriesController,
} = require("../../controllers/admin/adminGetAllBottomCategoriesController");
const multer = require("multer");
const {
  adminGeneratePreSignedUrlAddProductController,
} = require("../../controllers/admin/adminAddProductControllerfile/adminGeneratePreSignedUrlAddProductController");
const {
  adminDeleteHalfUploadedFileCloudinaryController,
} = require("../../controllers/admin/adminAddProductControllerfile/adminDeleteHalfUploadedFileCloudinaryController");
const {
  adminAddProductController,
} = require("../../controllers/admin/adminAddProductControllerfile/adminAddProductController");
const {
  adminDeleteSingleProductController,
} = require("../../controllers/admin/adminDeleteSingleProductController");
const {
  adminGetInStockProductsController,
} = require("../../controllers/admin/adminGetInStockProductsController");
const {
  adminGetOutofStockProductsController,
} = require("../../controllers/admin/adminGetOutofStockProductsController");
const {
  adminGetSearchFilterAllProductsController,
} = require("../../controllers/admin/adminSearchProductsFilterController/adminGetSearchFilterAllProductsController");
const {
  adminLogoutController,
} = require("../../controllers/admin/adminLogoutController");
const {
  getAllUsersDataController,
} = require("../../controllers/admin/getAllUsersDataController");
const {
  getSearchUsersFilterDataController,
} = require("../../controllers/admin/getSearchUsersFilterDataController");
const {
  adminDeleteUserController,
} = require("../../controllers/admin/adminDeleteUserController");
const {
  adminGetAllProductsController,
} = require("../../controllers/admin/adminGetAllProductsController");
const {
  adminGeneratePreSignedUrlHomeCarouselImgController,
} = require("../../controllers/admin/adminGeneratePreSignedUrlHomeCarouselImgController");
const {
  adminDeleteHalfUploadedHomeCarouselImgCloudinaryController,
} = require("../../controllers/admin/adminDeleteHalfUploadedHomeCarouselImgCloudinaryController");
const router = express.Router();

// admin login routes start here
router.patch("/logout", adminLogoutController);
router.post("/signup", adminSignup);
router.post("/login", adminLogin);
// admin login routes end here

// get all customers or user registers data route is start from here
router.get("/getAllUsersData", checkAdminJwtToken, getAllUsersDataController);
router.get(
  "/getSearchUsersFilterData",
  checkAdminJwtToken,
  getSearchUsersFilterDataController,
);
router.delete(
  "/adminDeleteUser/:userid",
  checkAdminJwtToken,
  adminDeleteUserController,
);

// get all customers or user registers data route is start from here

// admin paasword rest routes is start from here
router.post("/resetPassword", adminResetPassword);
router.post("/verifyOtp", verifyOtp);
// admin paasword rest routes is end here

router.get("/profileDetail", adminProfileDetailController);

// admin categories route is start from here
router.get("/getAllCategories", adminGetAllCategoriesController);
router.post(
  "/addProductCategories",
  checkAdminJwtToken,
  adminAddProductCategoriesController,
);
router.get(
  "/getAllBottomCategories",
  checkAdminJwtToken,
  adminGetAllBottomCategoriesController,
);
router.delete(
  "/deleteCategorie/:id",
  checkAdminJwtToken,
  adminDeleteCategoriesController,
);
// admin categories route is end here

// admingetAllProducts route is start from here
router.get(
  "/getAllProducts",
  checkAdminJwtToken,
  adminGetAllProductsController,
);
router.get(
  "/getInStockProducts",
  checkAdminJwtToken,
  adminGetInStockProductsController,
);
router.get(
  "/getOutofStockProducts",
  checkAdminJwtToken,
  adminGetOutofStockProductsController,
);
router.get(
  "/getSearchFilterAllProducts",
  checkAdminJwtToken,
  adminGetSearchFilterAllProductsController,
);
// admingetAllProducts route is end here

////////////
// admin addproduct  route url is start from here all routes is the part addproduct
// direct upload from browser first make presigned url from clodinary route is start from here
router.get(
  "/addProductGeneratePreSignedUrl",
  checkAdminJwtToken,
  adminGeneratePreSignedUrlAddProductController,
);
// direct upload from browser first make presigned url from clodinary route is end here

//  half upload data on cloudinary delete request route is start here
router.post(
  "/api/cloudinary/delete-halfUploadedFile",
  adminDeleteHalfUploadedFileCloudinaryController,
);
//  half upload data on cloudinary delete request route is end here

// addproduct in to backe route is start from here
router.post("/addProduct", checkAdminJwtToken, adminAddProductController);
// addproduct in to backe route is end here
// admin addproduct all routes is the part addproduct is end here
//////////

// /adminDeleteProduct route is start from here
router.delete(
  "/adminDeleteProduct",
  checkAdminJwtToken,
  adminDeleteSingleProductController,
);
// /adminDeleteProduct route is end here

// backendGeneratePresignedSignatureCloudinary homeCarousel route is start from here
router.get(
  "/GenetatePreSignedSignatureHomeCarouselImg",
  checkAdminJwtToken,
  adminGeneratePreSignedUrlHomeCarouselImgController,
);
// backendGeneratePresignedSignatureCloudinary homeCarousel route is start from here

// backendGeneratePresignedSignatureCloudinary homeCarousel route is start from here
router.post(
  "/adminDeleteHalfFailFileHomeCarouselImgFromCloudinary",
  adminDeleteHalfUploadedHomeCarouselImgCloudinaryController,
);
// backendGeneratePresignedSignatureCloudinary homeCarousel route is end here

module.exports = router;
